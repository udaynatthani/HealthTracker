const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const WearableData = require("../models/WearableData");
const { analyzeHealth } = require('../services/ai.service');
router.post("/analyze", async (req, res) => {
    const data = await WearableData.find({userId:req.userId});

    if(!data.length){
        return res.status(400).json({error:"No data available for analysis"});
    }

    const result =await analyzeHealth(data);
    res.json(result);
});

module.exports = router;