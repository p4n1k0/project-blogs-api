const services = require('../services/login.service');
const generateToken = require('../utils/generateToken');

module.exports = async (req, res) => {
  const data = await services(req.body);

  if (data.type) {
    return res.status(400).json({ message: data.type });
  }
  const token = generateToken({ email: req.body.email });

  res.status(200).json({ token });
};
