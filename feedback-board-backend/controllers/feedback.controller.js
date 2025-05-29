const Feedback = require("../models/Feedback");

// @desc    Submit new feedback
// @route   POST /api/v1/feedback
// @access  Public
exports.submitFeedback = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    // Basic validation
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, and category",
      });
    }

    const newFeedback = await Feedback.create({
      title,
      description,
      category,
    });

    res.status(201).json({
      success: true,
      data: newFeedback,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while submitting feedback",
    });
  }
};

// @desc    Get all feedback items
// @route   GET /api/v1/feedback
// @access  Public
exports.getFeedbacks = async (req, res, next) => {
  try {
    let query;
    const { category, sortBy } = req.query; // For filtering and sorting

    let queryStr = {};

    // Filter by category
    if (category) {
      queryStr.category = category;
    }

    query = Feedback.find(queryStr);

    // Sorting
    if (sortBy) {
      if (sortBy === "recent") {
        query = query.sort("-createdAt"); // Descending by creation date
      } else if (sortBy === "mostUpvoted") {
        query = query.sort("-upvotes"); // Descending by upvotes
      }
    } else {
      query = query.sort("-createdAt"); // Default sort by recent
    }

    const feedbacks = await query;

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error getting feedbacks:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching feedbacks",
    });
  }
};

// @desc    Upvote a feedback item
// @route   PUT /api/v1/feedback/:id/upvote
// @access  Public
exports.upvoteFeedback = async (req, res, next) => {
  try {
    const feedbackId = req.params.id;

    // Validate MongoDB ObjectId
    if (!feedbackId.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid feedback ID format" });
    }

    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback item not found",
      });
    }

    // Increment upvotes
    // In a real application, you would add logic here to check if the user/device has already upvoted.
    // For this example, we're keeping it simple and just incrementing.
    // The client-side will use local storage to limit upvotes per session/device.
    feedback.upvotes += 1;
    await feedback.save();

    res.status(200).json({
      success: true,
      data: feedback,
      message: "Feedback upvoted successfully",
    });
  } catch (error) {
    console.error("Error upvoting feedback:", error);
    res.status(500).json({
      success: false,
      message: "Server error while upvoting feedback",
    });
  }
};

// @desc    Get feedback by ID (Optional, could be useful)
// @route   GET /api/v1/feedback/:id
// @access  Public
exports.getFeedbackById = async (req, res, next) => {
  try {
    const feedbackId = req.params.id;

    if (!feedbackId.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid feedback ID format" });
    }

    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error("Error getting feedback by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching feedback item",
    });
  }
};
