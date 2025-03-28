const { User, BlogPost } = require('../models')

module.exports = async (id, email) => {
    const userId = (await User.findOne({ where: { email } })).id;
    const post = await BlogPost.findByPk(id);
    if (!post) return { type: 404, message: 'Post does not exist' };
    if (userId !== post.userId) return { type: 401, message: 'Unauthorized user' };
    await post.destroy();
    return { type: null, message: null };
}
