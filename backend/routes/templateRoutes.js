// const express = require('express');
// const { protect } = require('../middleware/auth');
// const {
//   getTemplates,
//   getTemplate,
//   createTemplate,
//   updateTemplate,
//   deleteTemplate,
//   setDefaultTemplate,
// } = require('../controllers/templateController');

// const router = express.Router();

// router.route('/').get(protect, getTemplates).post(protect, createTemplate);
// router
//   .route('/:id')
//   .get(protect, getTemplate)
//   .put(protect, updateTemplate)
//   .delete(protect, deleteTemplate);
// router.put('/:id/setdefault', protect, setDefaultTemplate);

// module.exports = router;