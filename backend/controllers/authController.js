// const passport = require('passport'); // Add this at the top
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const { JWT_SECRET, JWT_EXPIRE, OTP_EXPIRE_MINUTES, EMAIL_USER, EMAIL_PASS } = require('../config/config');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// // Helper function for error responses
// const errorResponse = (res, statusCode, message) => {
//   return res.status(statusCode).json({
//     success: false,
//     error: message
//   });
// };

// // @desc    Google OAuth
// // @route   GET /api/auth/google
// // @access  Public
// exports.googleAuth = passport.authenticate('google', {
//   scope: ['profile', 'email'],
// });

// // @desc    Google OAuth callback
// // @route   GET /api/auth/google/callback
// // @access  Public
// exports.googleAuthCallback = (req, res, next) => {
//   passport.authenticate('google', (err, user, info) => {
//     if (err) {
//       return errorResponse(res, 500, 'Google authentication failed');
//     }
//     if (!user) {
//       return errorResponse(res, 401, 'Google authentication failed');
//     }

//     sendTokenResponse(user, 200, res);
//   })(req, res, next);
// };

// // @desc    Forgot password
// // @route   POST /api/auth/forgotpassword
// // @access  Public
// exports.forgotPassword = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return errorResponse(res, 400, 'Please provide an email');
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       // Security: Don't reveal if user doesn't exist
//       return res.status(200).json({ 
//         success: true,
//         message: 'If an account exists, an OTP has been sent'
//       });
//     }

//     // Generate OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
//     const otpExpire = new Date(Date.now() + OTP_EXPIRE_MINUTES * 60 * 1000);

//     // Save OTP
//     user.resetPasswordOtp = otp;
//     user.resetPasswordOtpExpire = otpExpire;
//     await user.save();

//     // Create reusable transporter object
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: EMAIL_USER,
//         pass: EMAIL_PASS
//       }
//     });

//     // Send mail with defined transport object
//     const mailOptions = {
//       from: `"InvoicePro" <${EMAIL_USER}>`,
//       to: email,
//       subject: 'Password Reset OTP',
//       text: `Your OTP code is: ${otp}`,
//       html: `<p>Your OTP code is: <strong>${otp}</strong></p>
//              <p>This code will expire in ${OTP_EXPIRE_MINUTES} minutes.</p>`
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ 
//       success: true, 
//       message: 'OTP sent to email' 
//     });

//   } catch (err) {
//     console.error('Forgot password error:', err);
//     errorResponse(res, 500, 'Server error');
//   }
// };

// // @desc    Verify OTP
// // @route   POST /api/auth/verifyotp
// // @access  Public
// exports.verifyOtp = async (req, res, next) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return errorResponse(res, 400, 'Please provide email and OTP');
//     }

//     const user = await User.findOne({
//       email,
//       resetPasswordOtp: otp,
//       resetPasswordOtpExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return errorResponse(res, 400, 'Invalid or expired OTP');
//     }

//     res.status(200).json({
//       success: true,
//       message: 'OTP verified successfully'
//     });

//   } catch (err) {
//     console.error('Verify OTP error:', err);
//     errorResponse(res, 500, 'Server error');
//   }
// };

// // @desc    Reset password
// // @route   POST /api/auth/resetpassword
// // @access  Public
// exports.resetPassword = async (req, res, next) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     if (!email || !otp || !newPassword) {
//       return errorResponse(res, 400, 'Please provide email, OTP and new password');
//     }

//     const user = await User.findOne({
//       email,
//       resetPasswordOtp: otp,
//       resetPasswordOtpExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return errorResponse(res, 400, 'Invalid or expired OTP');
//     }

//     user.password = newPassword;
//     user.resetPasswordOtp = undefined;
//     user.resetPasswordOtpExpire = undefined;
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: 'Password reset successful'
//     });

//   } catch (err) {
//     console.error('Reset password error:', err);
//     errorResponse(res, 500, 'Server error');
//   }
// };

// // ... (keep your other existing controller methods)
// // @desc    Register user
// // @route   POST /api/auth/register
// // @access  Public
// exports.register = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validate input
//     if (!name || !email || !password) {
//       return errorResponse(res, 400, 'Please provide name, email and password');
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return errorResponse(res, 400, 'Email already registered');
//     }

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password,
//     });

//     sendTokenResponse(user, 201, res);
//   } catch (err) {
//     console.error('Registration error:', err);
    
//     // Handle validation errors
//     if (err.name === 'ValidationError') {
//       const messages = Object.values(err.errors).map(val => val.message);
//       return errorResponse(res, 400, messages.join(', '));
//     }
    
//     errorResponse(res, 500, 'Server error');
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // Validate email & password
//     if (!email || !password) {
//       return errorResponse(res, 400, 'Please provide email and password');
//     }

//     // Check for user
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return errorResponse(res, 401, 'Invalid credentials');
//     }

//     // Check if password matches
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return errorResponse(res, 401, 'Invalid credentials');
//     }

//     sendTokenResponse(user, 200, res);
//   } catch (err) {
//     console.error('Login error:', err);
//     errorResponse(res, 500, 'Server error');
//   }
// };

// // @desc    Get current logged in user
// // @route   GET /api/auth/me
// // @access  Private
// exports.getMe = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return errorResponse(res, 404, 'User not found');
//     }

//     res.status(200).json({
//       success: true,
//       data: user
//     });
//   } catch (err) {
//     console.error('Get user error:', err);
//     errorResponse(res, 500, 'Server error');
//   }
// };

// // @desc    Update user details
// // @route   PUT /api/auth/updatedetails
// // @access  Private
// exports.updateDetails = async (req, res, next) => {
//   try {
//     let fieldsToUpdate = {};
    
//     // Handle file upload if avatar exists
//     if (req.file) {
//       // Add uploaded avatar path
//       fieldsToUpdate.avatar = `/uploads/${req.file.filename}`;
//     }

//     // Parse JSON data from form-data
//     if (req.body.data) {
//       try {
//         const jsonData = JSON.parse(req.body.data);
//         fieldsToUpdate = { ...fieldsToUpdate, ...jsonData };
//       } catch (parseError) {
//         console.error('Error parsing JSON data:', parseError);
//         return errorResponse(res, 400, 'Invalid profile data format');
//       }
//     } else {
//       // If no file was uploaded, use regular body data
//       fieldsToUpdate = {
//         ...fieldsToUpdate,
//         name: req.body.name,
//         email: req.body.email,
//         company: req.body.company,
//         darkMode: req.body.darkMode
//       };
//     }

//     // Validate required fields
//     if (!fieldsToUpdate.name || !fieldsToUpdate.email) {
//       return errorResponse(res, 400, 'Please provide name and email');
//     }

//     const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) {
//       return errorResponse(res, 404, 'User not found');
//     }

//     res.status(200).json({
//       success: true,
//       data: user
//     });

//   } catch (err) {
//     console.error('Update details error:', err);
    
//     if (err.code === 11000) {
//       return errorResponse(res, 400, 'Email already in use');
//     }
    
//     errorResponse(res, 500, 'Server error');
//   }
// };


// // @desc    Update password
// // @route   PUT /api/auth/updatepassword
// // @access  Private
// exports.updatePassword = async (req, res, next) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     // Validate input
//     if (!currentPassword || !newPassword) {
//       return errorResponse(res, 400, 'Please provide current and new password');
//     }

//     const user = await User.findById(req.user.id).select('+password');
//     if (!user) {
//       return errorResponse(res, 404, 'User not found');
//     }

//     // Check current password
//     if (!(await user.matchPassword(currentPassword))) {
//       return errorResponse(res, 401, 'Current password is incorrect');
//     }

//     user.password = newPassword;
//     await user.save();

//     sendTokenResponse(user, 200, res);
//   } catch (err) {
//     console.error('Update password error:', err);
//     errorResponse(res, 500, 'Server error');
//   }
// };
// // Get token from model, create cookie and send response
// const sendTokenResponse = (user, statusCode, res) => {
//   // Create token
//   const token = jwt.sign({ id: user._id }, JWT_SECRET, {
//     expiresIn: JWT_EXPIRE,
//   });

//   const options = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   if (process.env.NODE_ENV === 'production') {
//     options.secure = true;
//   }

//   res
//     .status(statusCode)
//     .cookie('token', token, options)
//     .json({
//       success: true,
//       token,
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         company: user.company,
//         darkMode: user.darkMode,
//       },
//     });
// };



const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.companyName = req.body.companyName || user.companyName;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      companyName: updatedUser.companyName,
      phone: updatedUser.phone,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
};
