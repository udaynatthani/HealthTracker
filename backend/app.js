const express = require("express");
const cors = require("cors");

const app = express();   // ✅ create app first

app.use(cors({
  origin: [
    "https://health-tracker-pi-ten.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

const uploadRoutes = require("./routes/upload.routes");
const analyzeRoutes = require("./routes/analyze.routes");
const aiRoutes = require("./routes/ai.routes");
const authRoutes = require("./routes/auth.routes");
app.use("/api", require("./routes/export.routes"));

app.use("/api", aiRoutes);
app.use("/api", analyzeRoutes);
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Backend is running 🚀"
  });
});

module.exports = app;