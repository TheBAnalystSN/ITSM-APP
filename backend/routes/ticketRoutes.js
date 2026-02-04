const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  createTicket,
  getMyTickets,
  getTicketById,
  deleteMyTicket,
  getAllTicketsAdmin,
  updateTicketStatusAdmin,
  deleteTicketAdmin,
} = require("../controllers/ticketController");

// admin routes first
router.get("/admin/all", protect, adminOnly, getAllTicketsAdmin);
router.patch("/admin/:id/status", protect, adminOnly, updateTicketStatusAdmin);
router.delete("/admin/:id", protect, adminOnly, deleteTicketAdmin);

// user routes
router.post("/", protect, createTicket); 
router.get("/", protect, getMyTickets);

// must be last
router.get("/:id", protect, getTicketById);
router.delete("/:id", protect, deleteMyTicket);

module.exports = router;
