const axios = require("axios");

const analyzeHealthWithAI = async (healthData) => {
  const response = await axios.post(
    "https://healthtracker-l79c.onrender.com/analyze",
    healthData,
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};

module.exports = {
  analyzeHealthWithAI
};
