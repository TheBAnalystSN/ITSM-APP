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

// ping routes
router.get("/ping", (req, res) => res.json({ message: "ticket routes are working" }));
router.post("/ping", (req, res) => res.json({ message: "POST ticket routes are working", body: req.body }));

// USER ticket routes
router.post("/", protect, createTicket);    
router.get("/", protect, getMyTickets);
router.get("/:id", protect, getTicketById);
router.delete("/:id", protect, deleteMyTicket);

// ADMIN ticket routes
router.get("/admin/all", protect, adminOnly, getAllTicketsAdmin);
router.patch("/admin/:id/status", protect, adminOnly, updateTicketStatusAdmin);
router.delete("/admin/:id", protect, adminOnly, deleteTicketAdmin);

module.exports = router;
