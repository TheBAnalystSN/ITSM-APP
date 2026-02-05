const express = require("express");
const router = express.Router();

const {
  getAllTicketsAdmin,
  deleteTicket,
} = require("../controllers/ticketController");

const { protect, admin } = require("../middleware/authMiddleware");

// ADMIN ROUTES
router.get("/admin/all", protect, admin, getAllTicketsAdmin);
router.delete("/:id", protect, admin, deleteTicket);

module.exports = router;
