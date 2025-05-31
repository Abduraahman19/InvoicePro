const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoiceController');

const router = express.Router();

router.route('/').get(protect, getInvoices).post(protect, createInvoice);
router
  .route('/:id')
  .get(protect, getInvoice)
  .put(protect, updateInvoice)
  .delete(protect, deleteInvoice);

module.exports = router;