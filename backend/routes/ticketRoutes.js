const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createTicket, getMyTickets, getTicketById } = require("../controllers/ticketController");

// sanity check route
router.get("/ping", (req, res) => {
  res.json({ message: "tickets route mounted" });
});

// create ticket
router.post("/", protect, createTicket);

// get all tickets for logged-in user
router.get("/", protect, getMyTickets);

// get ticket by id
router.get("/:id", protect, getTicketById);

module.exports = router;
