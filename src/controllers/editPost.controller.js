const services = require('../services/editPost.service');
const getPostByIdController = require('./getPostById.controller');


module.exports = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Some required fields are missing' });
    const { id } = req.params;
    const email = req.hashToken.email;
    const update = await services({ id, email: email, ...req.body });
    if (update.type) return res.status(401).json({ message: update.message });
    getPostByIdController(req, res);
};
