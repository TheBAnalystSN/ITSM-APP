const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// GET /api/users/profile (protected)
router.get("/profile", protect, async (req, res) => {
  return res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
