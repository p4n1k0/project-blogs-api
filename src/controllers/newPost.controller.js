const services = require('../services/newPost.service');

module.exports = async (req, res) => {
    const data = await services(req.body, req.hashToken.email);

    if (data.type) {
        return res.status(data.type).json({ message: data.message });
    }
    res.status(201).json(data);
};
