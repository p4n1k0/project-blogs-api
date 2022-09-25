const jwt = require('jsonwebtoken');
require('dotenv').config();
const services = require('../services/login.service');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  const data = await services(req.body);

  if (data.type) {
    return res.status(400).json({ message: data.type });
  }
  const jwtConfig = { algorithm: 'HS256' };
  const token = jwt.sign({ email: req.body.email }, secret, jwtConfig);

  res.status(200).json({ token });
};
