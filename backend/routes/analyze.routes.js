const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const WearableData = require("../models/WearableData");
const {analyzeHealthWithAI} = require("../services/ai.service");
router.post("/analyze",auth, async (req, res) => {
    const data = await WearableData.find({userId: req.user.id});
    console.log("User ID for analysis:", req.userId);
console.log("Data for analysis:", data);
    if(!data.length){
        return res.status(400).json({error:"No data available for analysis"});
    }

    const result =await analyzeHealth(data);
    res.json(result);
});

module.exports = router;