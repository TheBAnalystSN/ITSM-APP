const express = require("express");
const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/authMiddleware");
const {
  addComment,
  getCommentsForTicket,
} = require("../controllers/commentController");

router.post("/", protect, addComment);
router.get("/", protect, getCommentsForTicket);

module.exports = router;
