const axios = require("axios");

const analyzeHealthWithAI = async (healthData) => {
  const response = await axios.post(
    "http://localhost:8000/analyze",
    healthData,
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};

module.exports = {
  analyzeHealthWithAI
};
