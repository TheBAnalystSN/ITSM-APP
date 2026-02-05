const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "All fields required" });
  }

  const ticket = await Ticket.create({
    user: req.user._id,
    title,
    description,
  });

  res.status(201).json(ticket);
};

exports.getMyTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id });
  res.json(tickets);
};
