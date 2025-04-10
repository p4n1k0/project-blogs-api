const { Category, User, BlogPost, PostCategory } = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env]);


const newPost = async ({ title, content, categoryIds }, email) => {
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

const getPosts = async () => {
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

const getPostById = async (id) => {
    const post = await BlogPost.findOne({
        where: { id },
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
    return post;
};

const unauthorized = 'Unauthorized user';
const deletePost = async (id, email) => {
    const userId = (await User.findOne({ where: { email } })).id;
    const post = await BlogPost.findByPk(id);
    if (!post) return { type: 404, message: 'Post does not exist' };
    if (userId !== post.userId) return { type: 401, message: unauthorized };
    await post.destroy();
    return { type: null, message: null };
};

const editPost = async ({ id, email, title, content }) => {
    const userId = (await User.findOne({ where: { email } })).id;    
    const idToBeUpdated = (await BlogPost.findByPk(id)).userId;
    if (userId !== idToBeUpdated) return { type: 401, message: unauthorized };

    const update = await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });
    return { type: null, message: update };
};

const findPost = async (query) => {
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


module.exports = {
    getPosts,
    getPostById,
    deletePost,
    newPost,
    editPost,
    findPost,
};
