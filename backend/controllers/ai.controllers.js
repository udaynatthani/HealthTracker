const axios = require("axios");
const WearableData = require("../models/WearableData");

exports.getAIInsights = async (req, res) => {
  try {
    // ✅ Correct query
    const data = await WearableData.find({ userId: req.userId });

    if (!data.length) {
      return res.json({
        risk_score: 0,
        risk_level: "Low",
        insights: ["No wearable data available"]
      });
    }

    // ✅ Clean numeric values safely
    const cleanData = data.map(d => ({
      heartRate: Number(d.heartRate) || 0,
      steps: Number(d.steps) || 0,
      sleepHours: Number(d.sleepHours) || 0
    }));

  

    const aiResponse = await axios.post(
      `https://healthtracker-l79c.onrender.com/analyze`,
      cleanData,
      { timeout: 20000 } // increase timeout for Render
    );

    return res.json(aiResponse.data);

  } catch (err) {
    console.error("AI ERROR FULL:", err.response?.data || err.message);

    return res.status(500).json({
      risk_score: "N/A",
      risk_level: "N/A",
      insights: ["AI service unavailable"]
    });
  }
};