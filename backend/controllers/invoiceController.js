const Invoice = require('../models/Invoice');
const Client = require('../models/Client');
const Template = require('../models/Template');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
exports.getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found',
      });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
exports.createInvoice = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // If client ID is provided, fetch client details
    if (req.body.clientId) {
      const client = await Client.findOne({
        _id: req.body.clientId,
        user: req.user.id,
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          error: 'Client not found',
        });
      }

      req.body.client = {
        id: client._id,
        name: client.name,
        address: client.address,
        email: client.email,
        phone: client.phone,
        taxId: client.taxId,
      };
    }

    // If template ID is provided, fetch template
    if (req.body.templateId) {
      const template = await Template.findOne({
        _id: req.body.templateId,
        user: req.user.id,
      });

      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'Template not found',
        });
      }

      req.body.template = template._id;
    }

    // Calculate item totals
    if (req.body.items && req.body.items.length > 0) {
      req.body.items = req.body.items.map((item) => {
        item.total = item.quantity * item.price;
        return item;
      });
    }

    const invoice = await Invoice.create(req.body);

    res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private
exports.updateInvoice = async (req, res, next) => {
  try {
    let invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found',
      });
    }

    // If client ID is provided, fetch client details
    if (req.body.clientId) {
      const client = await Client.findOne({
        _id: req.body.clientId,
        user: req.user.id,
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          error: 'Client not found',
        });
      }

      req.body.client = {
        id: client._id,
        name: client.name,
        address: client.address,
        email: client.email,
        phone: client.phone,
        taxId: client.taxId,
      };
    }

    // If template ID is provided, fetch template
    if (req.body.templateId) {
      const template = await Template.findOne({
        _id: req.body.templateId,
        user: req.user.id,
      });

      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'Template not found',
        });
      }

      req.body.template = template._id;
    }

    // Calculate item totals
    if (req.body.items && req.body.items.length > 0) {
      req.body.items = req.body.items.map((item) => {
        if (!item.total) {
          item.total = item.quantity * item.price;
        }
        return item;
      });
    }

    invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private
exports.deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found',
      });
    }

    await invoice.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};