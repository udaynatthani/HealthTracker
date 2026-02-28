const axios = require("axios");

const analyzeHealthWithAI = async (healthData) => {
  const response = await axios.post(
    "https://healthtracker-1-o89e.onrender.com/analyze",
    healthData,
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};

module.exports = {
  analyzeHealthWithAI
};
