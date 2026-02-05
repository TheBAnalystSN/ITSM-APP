const Comment = require("../models/Comment");
const Ticket = require("../models/Ticket");

exports.addComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const comment = await Comment.create({
      ticket: ticket._id,
      author: req.user._id,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentsForTicket = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const comments = await Comment.find({ ticket: ticket._id })
      .populate("author", "name email role")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
