const axios = require("axios");

const analyzeHealthWithAI = async (healthData) => {
  const response = await axios.post(
   process.env.AI_SERVICE_URL + "/analyze",
    healthData,
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};

module.exports = {
  analyzeHealthWithAI
};
