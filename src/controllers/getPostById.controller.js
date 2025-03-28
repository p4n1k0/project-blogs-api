const services = require('../services/getPostById.service');

module.exports = async (req, res) => {
    const { id } = req.params;
    const post = await services(id);
    if (post) return res.status(200).json(post);
    res.status(404).json({ message: 'Post does not exist' });
};
