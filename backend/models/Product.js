// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   name: {
//     type: String,
//     required: [true, 'Please add a product name'],
//   },
//   description: String,
//   price: {
//     type: Number,
//     required: [true, 'Please add a price'],
//   },
//   tax: {
//     type: Boolean,
//     default: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Product', productSchema);