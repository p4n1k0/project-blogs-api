const { BlogPost, User } = require('../models');

module.exports = async ({ id, email, title, content }) => {
    const userId = (await User.findOne({ where: { email } })).id;
    const idToBeUpdated = (await BlogPost.findByPk(id)).userId;
    if (userId !== idToBeUpdated) return { type: 401, message: 'Unauthorized user' };
    const update = await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });
    return { type: null, message: update };
};
