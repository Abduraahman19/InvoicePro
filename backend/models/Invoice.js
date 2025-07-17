// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   quantity: Number,
//   price: Number,
//   total: Number,
//   tax: Boolean,
// });

// const invoiceSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   invoiceNumber: String,
//   date: Date,
//   dueDate: Date,
//   company: {
//     name: String,
//     address: String,
//     email: String,
//     phone: String,
//     logo: String,
//     website: String,
//     taxId: String,
//   },
//   client: {
//     id: String,
//     name: String,
//     address: String,
//     email: String,
//     phone: String,
//     taxId: String,
//   },
//   items: [itemSchema],
//   taxRate: Number,
//   discount: Number,
//   shipping: Number,
//   notes: String,
//   terms: String,
//   currency: String,
//   template: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Template',
//   },
//   paymentDetails: {
//     bankName: String,
//     accountNumber: String,
//     iban: String,
//     swift: String,
//     upiId: String,
//     qrCode: String,
//     paymentTerms: String,
//   },
//   status: {
//     type: String,
//     enum: ['draft', 'sent', 'paid', 'overdue'],
//     default: 'draft',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Invoice', invoiceSchema);







const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
    client: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
    },
    date: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    items: [
      {
        description: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    taxRate: {
      type: Number,
      default: 0,
    },
    taxAmount: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['paid', 'unpaid'], // Ensure both are included
      default: 'unpaid' // Default to unpaid
    },
    currency: {
      type: String,
      default: 'USD',
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
