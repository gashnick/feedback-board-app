const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  category: {
    type: String,
    required: [true, "Please select a category"],
    enum: ["bug", "feature", "improvement", "other"], // Predefined categories
    default: "other",
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  // To prevent multiple upvotes from the same "session" or device (simplified for now)
  // In a real app, this might involve IP addresses, user accounts, or more robust device fingerprinting.
  // For this example, we'll rely on frontend local storage and won't store voter IDs here to keep it simple for "anyone can vote".
  // If user accounts were a feature, you'd store an array of user IDs who upvoted.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Create a model from the schema
const Feedback = mongoose.model("Feedback", FeedbackSchema);
// Export the model to use it in other parts of the application
module.exports = Feedback;
