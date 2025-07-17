// const express = require('express');
// const { protect } = require('../middleware/auth');
// const {
//   getInvoices,
//   getInvoice,
//   createInvoice,
//   updateInvoice,
//   deleteInvoice
// } = require('../controllers/invoiceController');

// const router = express.Router();

// router.route('/')
//   .get(protect, getInvoices)
//   .post(protect, createInvoice);

// router.route('/:id')
//   .get(protect, getInvoice)
//   .put(protect, updateInvoice)
//   .delete(protect, deleteInvoice);

// module.exports = router;







const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  sendInvoice,
} = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');

// Apply protect middleware to all invoice routes
router.use(protect);

router.route('/')
  .post(createInvoice)
  .get(getInvoices);

router.route('/:id')
  .get(getInvoiceById)
  .put(updateInvoice)
  .delete(deleteInvoice);

router.post('/:id/send', sendInvoice);

module.exports = router;