const services = require('../services/getUsers.service');

module.exports = async (_req, res) => {
  const data = await services();

  res.status(200).json(data);
};
