const express = require("express");
const router = express.Router();
const { getAIInsights } = require("../controllers/ai.controllers");
const auth = require("../middleware/auth.middleware");

router.get("/ai-insights", auth,getAIInsights);

module.exports = router;
