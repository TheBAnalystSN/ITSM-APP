const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ message: "tickets route mounted" });
});

module.exports = router;
