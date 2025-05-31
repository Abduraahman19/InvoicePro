const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  price: Number,
  total: Number,
  tax: Boolean,
});

const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  invoiceNumber: String,
  date: Date,
  dueDate: Date,
  company: {
    name: String,
    address: String,
    email: String,
    phone: String,
    logo: String,
    website: String,
    taxId: String,
  },
  client: {
    id: String,
    name: String,
    address: String,
    email: String,
    phone: String,
    taxId: String,
  },
  items: [itemSchema],
  taxRate: Number,
  discount: Number,
  shipping: Number,
  notes: String,
  terms: String,
  currency: String,
  template: {
    type: mongoose.Schema.ObjectId,
    ref: 'Template',
  },
  paymentDetails: {
    bankName: String,
    accountNumber: String,
    iban: String,
    swift: String,
    upiId: String,
    qrCode: String,
    paymentTerms: String,
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'paid', 'overdue'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Invoice', invoiceSchema);