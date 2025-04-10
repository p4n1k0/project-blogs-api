const tokenValidation = require('../utils/tokenValidation');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const tokenRes = tokenValidation(token);
  if (tokenRes.type === 401) return res.status(401).json({ message: 'Expired or invalid token' });
  req.hashToken = tokenRes;
  next();
};
