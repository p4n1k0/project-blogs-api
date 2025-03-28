const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env]);

module.exports = async ({ title, content, categoryIds }, email) => {
    if (!title || !content || !categoryIds) return { type: 400, message: 'Some required fields are missing' };
    try {
        const data = await sequelize.transaction(async (transaction) => {
            const user = (await User.findOne({ where: { email } })).id;
            const now = new Date();
            const blogPostInfo = { title, content, userId: user, published: now, updated: now };
            const insertBlogPost = await BlogPost.create(blogPostInfo, { transaction });
            const postCategoryInfo = categoryIds.map((categoryId) => ({ postId: insertBlogPost.null, categoryId }));
            await PostCategory.bulkCreate(postCategoryInfo, { transaction });
            return insertBlogPost;
        });
        return { type: null, message: data };
    } catch {
        return { type: 400, message: '"categoryIds" not found' };
    }
};
