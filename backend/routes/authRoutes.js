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
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword); // Changed from '/forgot-password'
router.post('/verifyotp', verifyOtp); // Changed from '/verify-otp'
router.post('/resetpassword', resetPassword); // Changed from '/reset-password'

module.exports = router;