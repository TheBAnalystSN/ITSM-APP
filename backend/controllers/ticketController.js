const Ticket = require("../models/Ticket");

// USER: Create Ticet
exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      user: req.user._id,
    });

    return res.status(201).json(ticket);
  } catch (error) {
    console.error("CREATE TICKET ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// USER: Get My Tickets
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(tickets);
  } catch (error) {
    console.error("GET MY TICKETS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


// USER: Get Ticket by ID (ownership required)
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.json(ticket);
  } catch (error) {
    console.error("GET TICKET ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// USER: Delete Own Ticket
exports.deleteMyTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await ticket.deleteOne();
    return res.json({ message: "Ticket deleted" });
  } catch (err) {
    console.error("DELETE MY TICKET ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ADMIN: Get All Tickets
exports.getAllTicketsAdmin = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    return res.json(tickets);
  } catch (error) {
    console.error("ADMIN GET ALL TICKETS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ADMIN: Update Ticket Status
exports.updateTicketStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["Open", "In Progress", "Resolved"];

    if (!status || !allowed.includes(status)) {
      return res.status(400).json({
        message: "Status must be one of: Open, In Progress, Resolved",
      });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = status;
    await ticket.save();

    return res.json(ticket);
  } catch (error) {
    console.error("ADMIN UPDATE STATUS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ADMIN: Delete Any Ticket
exports.deleteTicketAdmin = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    await ticket.deleteOne();
    return res.json({ message: "Ticket deleted" });
  } catch (error) {
    console.error("ADMIN DELETE TICKET ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
