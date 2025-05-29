const express = require("express");
const {
  submitFeedback,
  getFeedbacks,
  upvoteFeedback,
  getFeedbackById,
} = require("../controllers/feedback.controller");

const router = express.Router();

// Route to submit new feedback
router.post("/", submitFeedback);

// Route to get all feedback items (with optional category filter and sorting)
// e.g., /api/v1/feedback?category=bug&sortBy=mostUpvoted
router.get("/", getFeedbacks);

// Route to get a specific feedback item by ID
router.get("/:id", getFeedbackById);

// Route to upvote a feedback item
router.put("/:id/upvote", upvoteFeedback);

module.exports = router;
