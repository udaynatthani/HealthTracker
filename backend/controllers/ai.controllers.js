const axios = require("axios");
const mongoose = require("mongoose");
const WearableData = require("../models/WearableData");

exports.getAIInsights = async (req, res) => {
  try {
    console.log("REQ.USERID:", req.userId);

    if (!req.userId) {
      return res.status(401).json({
        risk_score: "N/A",
        risk_level: "Unauthorized",
        insights: ["User not authenticated"]
      });
    }

    // ✅ DO NOT force ObjectId unless needed
    const data = await WearableData.find({
      user: req.userId
    }).lean();

    console.log("DATA LENGTH:", data.length);

    if (!data.length) {
      return res.json({
        risk_score: 0,
        risk_level: "Low",
        insights: ["No wearable data available"]
      });
    }

    const cleanData = data.map(d => ({
      heartRate: Number(d.heartRate) || 0,
      steps: Number(d.steps) || 0,
      sleepHours: Number(d.sleepHours) || 0
    }));

    let aiResponse;

    try {
      aiResponse = await axios.post(
        "https://healthtracker-l79c.onrender.com/analyze",
        cleanData,
        { timeout: 60000 }
      );
    } catch (aiError) {
      console.error("AI SERVICE ERROR:", aiError.response?.data || aiError.message);

      return res.json({
        risk_score: "N/A",
        risk_level: "Service Down",
        insights: ["AI service temporarily unavailable"]
      });
    }

    return res.json(aiResponse.data);

  } catch (err) {
    console.error("BACKEND CRASH:", err);
    return res.status(500).json({
      risk_score: "N/A",
      risk_level: "N/A",
      insights: ["Internal server error"]
    });
  }
};