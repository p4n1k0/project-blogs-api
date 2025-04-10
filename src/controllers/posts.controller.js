const service = require('../services/posts.service');



const newPost = async (req, res) => {
    const data = await service.newPost(req.body, req.hashToken.email);
    if (data.type) return res.status(data.type).json({ message: data.message });

    const id = data.message.null;
    res.status(201).json({ ...data.message.dataValues, id });
};


const getPosts = async (_req, res) => {
    const posts = await service.getPosts();

    res.status(200).json(posts);
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await service.getPostById(id);
    if (post) return res.status(200).json(post);
    res.status(404).json({ message: 'Post does not exist' });
};

const deletePost = async (req, res) => {
    const { type, message } = await service.deletePost(req.params.id, req.hashToken.email);
    if (type) res.status(type).json({ message });
    res.status(204).end();
};

const editPost = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Some required fields are missing' });

    const { id } = req.params;
    const email = req.hashToken.email;
    const update = await service.editPost({ id, email: email, ...req.body });
    if (update.type) return res.status(401).json({ message: update.message });

    getPostById(req, res);
};

const findPost = async (req, res) => {
    const data = await service.findPost(req.query.q);
    res.status(200).json(data);    
};


module.exports = {
    getPosts,
    getPostById,
    deletePost,
    newPost,
    editPost,
    findPost,
};
