const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  createTicket,
  getMyTickets,
  getTicketById,
  getAllTicketsAdmin,
  updateTicketStatusAdmin,
  deleteTicketAdmin,
} = require("../controllers/ticketController");

const commentRoutes = require("./commentRoutes");

// sanity check
router.get("/ping", (req, res) => {
  res.json({ message: "tickets route mounted" });
});

// ADMIN ROUTES 
router.get("/admin/all", protect, adminOnly, getAllTicketsAdmin);
router.patch("/admin/:id/status", protect, adminOnly, updateTicketStatusAdmin);
router.delete("/admin/:id", protect, adminOnly, deleteTicketAdmin);

// user ticket routes
router.post("/", protect, createTicket);
router.get("/", protect, getMyTickets);

// nested comment routes
router.use("/:ticketId/comments", commentRoutes);

// MUST COME LAST
router.get("/:id", protect, getTicketById);

module.exports = router;
