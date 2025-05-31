const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  id: String,
  name: String,
  styles: {
    backgroundColor: String,
    textColor: String,
    headerColor: String,
    fontFamily: String,
    tableHeaderBg: String,
    tableRowEvenBg: String,
    tableRowOddBg: String,
    borderColor: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Template', templateSchema);