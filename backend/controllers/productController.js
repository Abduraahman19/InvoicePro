// const Product = require('../models/Product');

// // @desc    Get all products
// // @route   GET /api/products
// // @access  Private
// exports.getProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find({ user: req.user.id }).sort('-createdAt');

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       data: products,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // @desc    Get single product
// // @route   GET /api/products/:id
// // @access  Private
// exports.getProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         error: 'Product not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // @desc    Create new product
// // @route   POST /api/products
// // @access  Private
// exports.createProduct = async (req, res, next) => {
//   try {
//     // Add user to req.body
//     req.body.user = req.user.id;

//     const product = await Product.create(req.body);

//     res.status(201).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // @desc    Update product
// // @route   PUT /api/products/:id
// // @access  Private
// exports.updateProduct = async (req, res, next) => {
//   try {
//     let product = await Product.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         error: 'Product not found',
//       });
//     }

//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// // @desc    Delete product
// // @route   DELETE /api/products/:id
// // @access  Private
// exports.deleteProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         error: 'Product not found',
//       });
//     }

//     await product.deleteOne({ _id: product._id });

//     res.status(200).json({
//       success: true,
//       data: {},
//     });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };