const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTicket,
  getMyTickets,
  getTicketById,
} = require("../controllers/ticketController");

router.post("/", protect, createTicket);
router.get("/", protect, getMyTickets);
router.get("/:id", protect, getTicketById);

module.exports = router;
