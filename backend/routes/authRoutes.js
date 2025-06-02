const express = require('express');
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  verifyOtp,
  resetPassword,
  googleAuth,
  googleAuthCallback,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.post('/verifyotp', verifyOtp);
router.post('/resetpassword', resetPassword);
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, (req, res) => {
  res.redirect('/');
});


module.exports = router;