const { analyzeHealthWithAI } = require("../services/ai.service");

router.post("/analyze", auth, async (req, res) => {
  try {
    const data = await WearableData.find({ userId: req.user.id });

    if (!data.length) {
      return res.status(400).json({ error: "No data available for analysis" });
    }

    const result = await analyzeHealthWithAI(data);

    res.json(result);
  } catch (err) {
    console.error("ANALYZE FULL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});