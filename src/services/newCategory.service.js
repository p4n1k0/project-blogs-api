const { Category } = require('../models');

module.exports = async (name) => {
    if (!name) return { type: 400, message: '"name" is required' };
    const data = await Category.create({ name });
    return data;
};
