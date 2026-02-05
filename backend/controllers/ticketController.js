const Ticket = require("../models/Ticket");

// ADMIN: Get all tickets
const getAllTicketsAdmin = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user", "name email");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

// ADMIN: Delete ticket
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
  getAllTicketsAdmin,
  deleteTicket,
};
