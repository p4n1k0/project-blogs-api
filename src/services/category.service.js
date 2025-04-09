const { Category } = require('../models');


const newCategory = async (name) => {
    if (!name) return { type: 400, message: '"name" is required' };
    const data = await Category.create({ name });
    return data;
};

const getCategories = async () => {
    const data = await Category.findAll();
    return data;
};


module.exports = {
    newCategory,
    getCategories,
}
