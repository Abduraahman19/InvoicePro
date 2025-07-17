// const express = require('express');
// const { protect } = require('../middleware/auth');
// const {
//   register,
//   login,
//   getMe,
//   updateDetails,
//   updatePassword,
//   forgotPassword,
//   verifyOtp,
//   resetPassword,
//   googleAuth,
//   googleAuthCallback,
// } = require('../controllers/authController');
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../public/uploads/'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter: function (req, file, cb) {
//     const filetypes = /jpeg|jpg|png/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Only image files (jpeg, jpg, png) are allowed!'));
//   }
// });



// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/me', protect, getMe);
// router.put(
//   '/updatedetails',
//   protect,
//   upload.single('avatar'), // Add this middleware for file upload
//   updateDetails
// );
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.post('/verifyotp', verifyOtp);
// router.post('/resetpassword', resetPassword);
// router.get('/google', googleAuth);
// router.get('/google/callback', googleAuthCallback, (req, res) => {
//   res.redirect('/');
// });


// module.exports = router;







const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/register', registerUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;