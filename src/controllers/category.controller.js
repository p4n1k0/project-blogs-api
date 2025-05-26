const service = require('../services/category.service');

const newCategory = async (req, res) => {
    const data = await service.newCategory(req.body.name);
    if (data.type) return res.status(data.type).json({ message: data.message });
    res.status(201).json(data);
};

const getCategories = async (_req, res) => {
    const data = await service.getCategories();
    res.status(200).json(data);
};

module.exports = {
    newCategory,
    getCategories
};
