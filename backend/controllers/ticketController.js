const Ticket = require("../models/Ticket");

// Create ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      user: req.user._id,
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error("CREATE TICKET ERROR:", error)
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's tickets
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id });
    res.json(tickets);
  } catch (error) {
    console.error("CREATE TICKET ERROR:", ERROR);
    res.status(500).json({ message: error.message });
  }
};

// Get ticket by ID (have to own it only)
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(ticket);
  } catch (error) {
    console.ERROR("CREATE TICKET ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
