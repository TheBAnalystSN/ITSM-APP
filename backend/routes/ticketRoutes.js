const express = require("express");
const router = express.Router();

const {
  createTicket,
  getAllTicketsAdmin,
  deleteTicket,
} = require("../controllers/ticketController");

const { protect, admin } = require("../middleware/authMiddleware");

// Create ticket (user)
router.post("/", protect, createTicket);

// Admin routes
router.get("/admin/all", protect, admin, getAllTicketsAdmin);
router.delete("/:id", protect, admin, deleteTicket);

module.exports = router;
