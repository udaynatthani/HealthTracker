const fs = require("fs");
const mongoose = require("mongoose");
const parseCSV = require("../utils/csvParser");
const WearableData = require("../models/WearableData");

exports.uploadWearableData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File not received" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    const records = await parseCSV(req.file.path);

    if (!records.length) {
      return res.status(400).json({ error: "CSV empty" });
    }

    const formattedData = records.map(row => ({
      userId: userObjectId, // 🔥 ObjectId ONLY
      heartRate: Number(row.heart_rate),
      steps: Number(row.steps),
      sleepHours: Number(row.sleep_hours),
      timestamp: new Date(row.timestamp)
    }));

    await WearableData.insertMany(formattedData);
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      inserted: formattedData.length
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
