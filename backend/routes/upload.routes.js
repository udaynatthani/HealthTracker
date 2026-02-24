const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const auth = require("../middleware/auth.middleware");
const WearableData = require("../models/WearableData");
const { uploadWearableData } = require("../controllers/upload.controller");

// ✅ UPLOAD (AUTH REQUIRED)
router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadWearableData
);

// ✅ FETCH USER DATA (AUTH REQUIRED)
router.get("/data", auth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const mongoose = require("mongoose");
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const data = await WearableData.find({ userId });

    res.json(data);
  } catch (err) {
    console.error("DATA FETCH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
