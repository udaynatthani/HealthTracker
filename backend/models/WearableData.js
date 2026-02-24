const mongoose = require("mongoose");

const wearableSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  
  heartRate: Number,
  steps: Number,
  sleepHours: Number,
  timestamp:  {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model("WearableData", wearableSchema);