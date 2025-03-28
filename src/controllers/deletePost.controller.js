const services = require('../services/deletePost.service')

module.exports = async (req, res) => {
    const { type, message } = await services(req.params.id, req.hashToken.email);
    if (type) res.status(type).json({ message });
    res.status(204).end();
};
