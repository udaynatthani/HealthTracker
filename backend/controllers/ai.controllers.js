const axios = require("axios");
const WearableData = require("../models/WearableData");

exports.getAIInsights = async (req, res) => {
  try {
    const data = await WearableData.find({id:req.userId});

    if (!data.length) {
      return res.json({
        risk_score: 0,
        risk_level: "Low",
        insights: ["No wearable data available"]
      });
    }

    // 🔴 CLEAN DATA (VERY IMPORTANT)
    const cleanData = data.map(d => ({
      heartRate: Number(d.heartRate),
      steps: Number(d.steps),
      sleepHours: Number(d.sleepHours)
    }));

    // 🔴 CALL PYTHON AI
    const aiResponse = await axios.post(
      "https://healthtracker-l79c.onrender.com/analyze",
      cleanData,
      { timeout: 10000 }
    );


    res.json(aiResponse.data);

  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.status(500).json({
      risk_score: "N/A",
      risk_level: "N/A",
      insights: ["AI service unavailable"]
    });
  }
};
