const express = require("express");
const router = express.Router({ mergeParams: true });

console.log("COMMENT ROUTES FILE LOADED");


const { protect } = require("../middleware/authMiddleware");
const {
  addComment,
  getCommentsForTicket,
} = require("../controllers/commentController");

// TEST ROUTE (TEMPORARY)
router.get("/test", (req, res) => {
  res.json({ message: "comment routes working" });
});

router.post("/", protect, addComment);
router.get("/", protect, getCommentsForTicket);

module.exports = router;
