// const mongoose = require('mongoose');

// const connectDB = async (retries = 5, delay = 5000) => {
//   const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/settingsDB';

//   for (let i = 0; i < retries; i++) {
//     try {
//       const conn = await mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });

//       console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//       return;
//     } catch (error) {
//       console.error(`❌ Database connection error: ${error.message}`);

//       if (i < retries - 1) {
//         console.log(`🔄 Retrying in ${delay / 1000} seconds... (${i + 1}/${retries})`);
//         await new Promise((res) => setTimeout(res, delay));
//       } else {
//         console.error('❗ Max retries reached. Exiting process.');
//         process.exit(1);
//       }
//     }
//   }
// };

// module.exports = connectDB;





const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;