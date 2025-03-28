const services = require('../services/deleteUser.service');

module.exports = async (req, res) => {
    await services(req.hashToken.email);
    res.status(204).end();
};
