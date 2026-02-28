const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No Authorization header" });
  }

  const token = req.headers.authorization.split(" ")[1];
  console.log("TOKEN:", token); 
  console.log("JWT SECRET:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: err.message });
  }
};
