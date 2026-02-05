const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");
const {
  createTicket,
  getAllTicketsAdmin,
  deleteTicket,
} = require("../controllers/ticketController");

router.post("/", protect, createTicket);
router.get("/admin/all", protect, admin, getAllTicketsAdmin);
router.delete("/:id", protect, admin, deleteTicket);

module.exports = router;
