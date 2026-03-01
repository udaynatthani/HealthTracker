const WearableData = require("../models/WearableData");

exports.exportData = async (req, res) => {
  try {
    const data = await WearableData.find().lean();

    const formatted = data.map(d => ({
      date: d.createdAt,
      heartRate: Number(d.heartRate),
      steps: Number(d.steps),
      sleepHours: Number(d.sleepHours),
      risk_score: Number(d.risk_score || 0),
      risk_level: d.risk_level || "Unknown"
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Export failed" });
  }
};