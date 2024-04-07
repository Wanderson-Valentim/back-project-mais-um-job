const jwt = require('jsonwebtoken');
require('dotenv').config()

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ');

  if (!token || token[0] !== 'Bearer' || !token[1]) {
    return res.status(401).json({ auth: false });
  }

  jwt.verify(token[1], process.env.SECRET_KEY, (err, decoded) => {
    if (err) { return res.status(401).json({ auth: false })};
    req.userId = decoded.id;
    next();
  });
}

module.exports = { validateToken }