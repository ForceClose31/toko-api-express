const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    try {
      const user = await User.findByPk(decoded.userId);
      if (!user) return res.sendStatus(403);

      req.user = user;
      next();
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
};

const authorizeAdmin = (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
};
