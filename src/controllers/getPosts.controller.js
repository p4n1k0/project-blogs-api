const services = require('../services/getPosts.service');

module.exports = async (_req, res) => {
    const posts = await services();
    res.status(200).json(posts);
};
