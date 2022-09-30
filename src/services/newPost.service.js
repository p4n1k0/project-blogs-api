const { Category, BlogPost, PostCategory, User } = require('../models');

const verifyIds = async (array) => {
    const data = await Category.findAndCountAll({
        where: {
            id: array,
        },
    });

    if (data.count !== array.length || array.length === 0) {
        return false;
    }
    return true;
};

const addPost = async (title, content, userId) => {
    const data = await BlogPost.create({
        title,
        content,
        userId,
        updated: new Date(),
        published: new Date(),
    });
    return data;
};

const addPostCategories = (postId, categoryIds) => {
    try {
        categoryIds.forEach(async (categoryId) => {
            await PostCategory.create({ postId, categoryId });
        });
    } catch (err) {
        console.log(err);
    }
};

const findId = async (email) => {
    const data = await User.findOne({
        where: { email },
    });

    return data;
};

module.exports = async ({ title, content, categoryIds }, email) => {
    if (!title || !content || !categoryIds) {
        return { type: 400, message: 'Some required fields are missing' };
    }
    const dataFindId = await findId(email);
    const dataVerifyIds = await verifyIds(categoryIds);

    if (!dataVerifyIds) {
        return { type: 400, message: '"categoryIds" not found' };
    }
    const data = await addPost(title, content, dataFindId.dataValues.id);
    addPostCategories(data.null, categoryIds);

    data.id = data.null;

    return data;
};
