const Ticket = require("../models/Ticket");

// POST /api/tickets (create ticket)
const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
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

// GET /api/tickets/admin/all
const getAllTicketsAdmin = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user", "name email");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

// DELETE /api/tickets/:id
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    await ticket.deleteOne();
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete ticket" });
  }
};

module.exports = {
  createTicket,
  getAllTicketsAdmin,
  deleteTicket,
};
