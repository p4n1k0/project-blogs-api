const { Category } = require('../models');

module.exports = async () => {
    const data = await Category.findAll();
    return data;
};
