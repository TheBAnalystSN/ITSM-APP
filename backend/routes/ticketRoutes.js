const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  createTicket,
  getMyTickets,
  getTicketById,
} = require("../controllers/ticketController");

const commentRoutes = require("./commentRoutes");

// sanity check route
router.get("/ping", (req, res) => {
  res.json({ message: "tickets route mounted" });
});

// nested comment routes
router.use("/:ticketId/comments", commentRoutes);

// ticket routes
router.post("/", protect, createTicket);
router.get("/", protect, getMyTickets);
router.get("/:id", protect, getTicketById);

module.exports = router;
