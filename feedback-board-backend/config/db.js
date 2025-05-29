const mongoose = require("mongoose");
require("dotenv").config(); // To use environment variables from .env file

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Mongoose 6 no longer needs useCreateIndex and useFindAndModify
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
// This module exports the connectDB function to be used in other parts of the application
// Ensure that the MONGO_URI is set in your .env file
