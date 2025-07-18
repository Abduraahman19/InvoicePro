const asyncHandler = require('express-async-handler');
const Invoice = require('../models/Invoice');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {
  try {
    const {
      client,
      date,
      dueDate,
      items,
      taxRate = 0,
      discount = 0,
      notes,
      currency = 'USD',
    } = req.body;

    // Validate required fields
    if (!client || !date || !dueDate || !items || items.length === 0) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    let { status = 'unpaid' } = req.body;

    // Validate status
    if (!['paid', 'unpaid'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value. Must be either "paid" or "unpaid"'
      });
    }

    // Calculate amounts
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount - discount;

    // Generate invoice number
    const invoiceCount = await Invoice.countDocuments({ user: req.user._id });
    const invoiceNumber = `INV-${(invoiceCount + 1).toString().padStart(5, '0')}`;

    const invoice = new Invoice({
      user: req.user._id,
      invoiceNumber,
      client,
      date,
      dueDate,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.quantity * item.rate
      })),
      subtotal,
      taxRate,
      taxAmount,
      discount,
      total,
      notes,
      status,
      currency,
    });

    const createdInvoice = await invoice.save();
    res.status(201).json(createdInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
// In your invoiceController.js
const getInvoices = asyncHandler(async (req, res) => {
  try {
    console.log('Fetching invoices for user:', req.user._id); // Debug log

    let invoices;
    if (req.user.isAdmin) {
      invoices = await Invoice.find({})
        .sort({ createdAt: -1 })
        .populate('user', 'name email');
    } else {
      invoices = await Invoice.find({ user: req.user._id })
        .sort({ createdAt: -1 });
    }

    console.log('Found invoices:', invoices.length); // Debug log
    res.json(invoices);
  } catch (error) {
    console.error('Error in getInvoices:', error);
    res.status(500).json({
      message: 'Failed to fetch invoices',
      error: error.message
    });
  }
});

// @desc    Get invoice by ID
// @route   GET /api/invoices/:id
// @access  Private
const getInvoiceById = asyncHandler(async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      res.status(404);
      throw new Error('Invoice not found');
    }

    // Check authorization
    if (invoice.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to view this invoice');
    }

    res.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private
const updateInvoice = asyncHandler(async (req, res) => {
  try {
    const {
      client,
      date,
      dueDate,
      items,
      taxRate = 0,
      discount = 0,
      notes,
      status = 'unpaid',
      currency = 'USD'
    } = req.body;

    // Validate required fields
    if (!client || !date || !dueDate || !items || items.length === 0) {
      res.status(400);
      throw new Error('Client, dates, and at least one item are required');
    }

    // Validate status
    if (!['paid', 'unpaid'].includes(status)) {
      res.status(400);
      throw new Error('Status must be either "paid" or "unpaid"');
    }

    // Find invoice
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      res.status(404);
      throw new Error('Invoice not found');
    }

    // Authorization check
    if (invoice.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to update this invoice');
    }

    // Calculate amounts
    const subtotal = items.reduce((sum, item) => {
      const amount = item.quantity * item.rate;
      return sum + amount;
    }, 0);

    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount - discount;

    // Prepare updated invoice data
    const updatedData = {
      client: {
        name: client.name,
        email: client.email,
        phone: client.phone || '',
        address: client.address || ''
      },
      date,
      dueDate,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.quantity * item.rate
      })),
      subtotal,
      taxRate,
      taxAmount,
      discount,
      total,
      notes: notes || '',
      status,
      currency
    };

    // Update and return the invoice
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: updatedInvoice,
      message: 'Invoice updated successfully'
    });

  } catch (error) {
    console.error(`Error updating invoice ${req.params.id}:`, error);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

const deleteInvoice = asyncHandler(async (req, res) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid invoice ID format'
      });
    }

    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({ 
        success: false,
        message: 'Invoice not found'
      });
    }

    // Check authorization - consistent with your other endpoints
    if (invoice.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized to delete this invoice'
      });
    }

    // Perform deletion - using deleteOne for consistency
    await Invoice.deleteOne({ _id: req.params.id });

    return res.status(200).json({ 
      success: true,
      message: 'Invoice deleted successfully'
    });

  } catch (error) {
    console.error('Delete Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error during deletion',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
// @desc    Send invoice via email
// @route   POST /api/invoices/:id/send
// @access  Private
const sendInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate('user');

  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }

  // Check if the user owns the invoice or is admin
  if (
    invoice.user._id.toString() !== req.user._id.toString() &&
    !req.user.isAdmin
  ) {
    res.status(401);
    throw new Error('Not authorized to send this invoice');
  }

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Format the invoice items for the email
  const itemsHtml = invoice.items
    .map(
      (item) => `
    <tr>
      <td>${item.description}</td>
      <td>${item.quantity}</td>
      <td>${invoice.currency} ${item.rate.toFixed(2)}</td>
      <td>${invoice.currency} ${item.amount.toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  // Email options
  const mailOptions = {
    from: `"${invoice.user.companyName || 'Invoice App'}" <${process.env.EMAIL_USER}>`,
    to: invoice.client.email,
    subject: `Invoice ${invoice.invoiceNumber} from ${invoice.user.companyName || invoice.user.name}`,
    html: `
      <h1>Invoice ${invoice.invoiceNumber}</h1>
      <p>From: ${invoice.user.companyName || invoice.user.name}</p>
      <p>To: ${invoice.client.name}</p>
      <p>Date: ${new Date(invoice.date).toLocaleDateString()}</p>
      <p>Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}</p>
      
      <h2>Items</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <p>Subtotal: ${invoice.currency} ${invoice.subtotal.toFixed(2)}</p>
      <p>Tax (${invoice.taxRate}%): ${invoice.currency} ${invoice.taxAmount.toFixed(2)}</p>
      <p>Discount: ${invoice.currency} ${invoice.discount.toFixed(2)}</p>
      <h3>Total: ${invoice.currency} ${invoice.total.toFixed(2)}</h3>
      
      <p>Status: ${invoice.status}</p>
      <p>Notes: ${invoice.notes || 'N/A'}</p>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500);
      throw new Error('Failed to send email');
    } else {
      res.json({ message: 'Email sent successfully' });
    }
  });
});

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  sendInvoice,
};