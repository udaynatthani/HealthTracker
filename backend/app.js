const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");
const analyzeRoutes = require("./routes/analyze.routes");
const aiRoutes = require("./routes/ai.routes");
const authRoutes = require("./routes/auth.routes");
// const cors = require("cors");
const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));


app.use("/api", aiRoutes);
app.use(cors());
app.use(express.json());
app.use("/api",analyzeRoutes);
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);


app.get("/health", (req, res) => {
    res.status(200).json({
      status: "Backend is running 🚀"
    });
  });
  
  



module.exports = app;
