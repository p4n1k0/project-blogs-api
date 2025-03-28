const { Category, User, BlogPost } = require('../models');

module.exports = async () => {
    const posts = await BlogPost.findAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: { exclude: ['password'] },
            },
            {
                model: Category,
                as: 'categories',
                through: { attributes: [] },
                attributes: { exclude: ['password'] },
            },
        ],
    });
    return posts;
};
