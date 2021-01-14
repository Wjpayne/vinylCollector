const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("x-auth-token");
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.userId;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
