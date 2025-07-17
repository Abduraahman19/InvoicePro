// // server.js
// process.removeAllListeners('warning');
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const passport = require('passport');
// const connectDB = require('./config/db');
// const errorHandler = require('./middleware/errorHandler');
// const multer = require('multer');
// const path = require('path');

// // Load env vars
// dotenv.config();

// // Connect to database
// connectDB();

// // Initialize express app
// const app = express();

// // Body parser
// app.use(express.json());

// // Cookie parser
// app.use(cookieParser());

// // Enable CORS
// app.use(cors());

// // Initialize passport
// app.use(passport.initialize());
// require('./config/passport'); // Load passport config

// // Serve static files from /uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
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

// // Make multer `upload` available if needed elsewhere
// app.set('uploadMiddleware', upload);

// // Route files
// const authRoutes = require('./routes/authRoutes');
// const clientRoutes = require('./routes/clientRoutes');
// const invoiceRoutes = require('./routes/invoiceRoutes');
// const productRoutes = require('./routes/productRoutes');
// const templateRoutes = require('./routes/templateRoutes');

// // Mount routers
// app.use('/api/auth', authRoutes);
// app.use('/api/clients', clientRoutes);
// app.use('/api/invoices', invoiceRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/templates', templateRoutes);

// // Error handler middleware
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// const server = app.listen(
//   PORT,
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// );

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   server.close(() => process.exit(1));
// });







const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});