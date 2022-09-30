const services = require('../services/newCategory.service');

module.exports = async (req, res) => {
    const data = await services(req.body.name);

    if (data.type) {
        return res.status(data.type).json({ message: data.message });
    }
    res.status(201).json(data);
};
