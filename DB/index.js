const mongoose = require('mongoose');

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log('Already connected to database');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

module.exports = connectDb;