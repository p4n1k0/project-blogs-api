const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

module.exports = async (query) => {
    const data = await BlogPost.findAll(
        {
            where: {
                [Op.or]: [{ title: { [Op.like]: `%${query}` } },
                { content: { [Op.like]: `%${query}%` } }],
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'displayName', 'email', 'image'],
                }, {
                    model: Category,
                    as: 'categories',
                }],
        },
    );
    return data;
};
