const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // For enabling Cross-Origin Resource Sharing
const connectDB = require("./config/db"); // MongoDB connection function

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
// Enable CORS for all routes and origins (you might want to restrict this in production)
app.use(cors());
// Body parser middleware to handle JSON request bodies
app.use(express.json());
// Body parser for URL-encoded data (though not strictly needed for this API if only using JSON)
app.use(express.urlencoded({ extended: false }));

// --- Routes ---
const feedbackRoutes = require("./routes/feedback.route");
app.use("/api/v1/feedback", feedbackRoutes); // Mount feedback routes under /api/v1/feedback

// Basic route for testing if the server is up
app.get("/", (req, res) => {
  res.send("Feedback Board API is running...");
});

// --- Error Handling Middleware (Optional but good practice) ---
// This should be the last middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
// Define the port for the server
const PORT = process.env.PORT || 5001; // Use port from .env or default to 5001

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
