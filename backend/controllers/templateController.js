// const Template = require('../models/Template');

// // @desc    Get all templates
// // @route   GET /api/templates
// // @access  Private
// exports.getTemplates = async (req, res, next) => {
//   try {
//     const templates = await Template.find({ user: req.user.id }).sort('-createdAt');

//     res.status(200).json({
//       success: true,
//       count: templates.length,
//       data: templates,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // @desc    Get single template
// // @route   GET /api/templates/:id
// // @access  Private
// exports.getTemplate = async (req, res, next) => {
//   try {
//     const template = await Template.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!template) {
//       return res.status(404).json({
//         success: false,
//         error: 'Template not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: template,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // @desc    Create new template
// // @route   POST /api/templates
// // @access  Private
// exports.createTemplate = async (req, res, next) => {
//   try {
//     // Add user to req.body
//     req.body.user = req.user.id;

//     const template = await Template.create(req.body);

//     res.status(201).json({
//       success: true,
//       data: template,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // @desc    Update template
// // @route   PUT /api/templates/:id
// // @access  Private
// exports.updateTemplate = async (req, res, next) => {
//   try {
//     let template = await Template.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!template) {
//       return res.status(404).json({
//         success: false,
//         error: 'Template not found',
//       });
//     }

//     template = await Template.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       data: template,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // @desc    Delete template
// // @route   DELETE /api/templates/:id
// // @access  Private
// exports.deleteTemplate = async (req, res, next) => {
//   try {
//     const template = await Template.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!template) {
//       return res.status(404).json({
//         success: false,
//         error: 'Template not found',
//       });
//     }

//     await template.deleteOne({ _id: template._id });

//     res.status(200).json({
//       success: true,
//       data: {},
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // @desc    Set default template
// // @route   PUT /api/templates/:id/setdefault
// // @access  Private
// exports.setDefaultTemplate = async (req, res, next) => {
//   try {
//     // First, unset all other templates as default
//     await Template.updateMany(
//       { user: req.user.id },
//       { $set: { isDefault: false } }
//     );

//     // Then set the selected template as default
//     const template = await Template.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id },
//       { $set: { isDefault: true } },
//       { new: true }
//     );

//     if (!template) {
//       return res.status(404).json({
//         success: false,
//         error: 'Template not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: template,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };