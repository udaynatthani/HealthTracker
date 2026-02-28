const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const WearableData = require("../models/WearableData");
const { analyzeHealth } = require('../services/ai.service');
router.post("/analyze", auth, async (req, res) => {
    try {
      const data = await WearableData.find({ userId: req.user.id });
      console.log("req.user.id:", req.user.id);
      if (!data.length) {
        return res.status(400).json({ error: "No data available for analysis" });
      }
  
      const result = await analyzeHealth(data);
      res.json(result);
  
    } catch (err) {
      console.error("ANALYZE ERROR:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  });
module.exports = router;