const jwt = require('jsonwebtoken');
const config = require('../config')

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ auth: false, msg: "No token provided" });
  }

  const decoded = jwt.verify(token, config.secret);

  req.userId = decoded.id;

  next()
};

module.exports = verifyToken;
