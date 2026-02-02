const Comment = require("../models/comment");
const Ticket = require("../models/Ticket");

// POST /api/tickets/:ticketId/comments
exports.addComment = async (req, res) => {
    console.log("COMMENT req.params:", req.params);
console.log("COMMENT req.user:", req.user && req.user._id);

  try {
    console.log("Current user:", req.user);
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Ownership check
    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const comment = await Comment.create({
      ticket: ticket._id,
      author: req.user._id,
      text,
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/tickets/:ticketId/comments
exports.getCommentsForTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Ownership check
    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const comments = await Comment.find({ ticket: ticket._id })
      .populate("author", "name email role")
      .sort({ createdAt: 1 });

    return res.json(comments);
  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
