const services = require('../services/findPost.service');

module.exports = async (req, res) => {
    const data = await services(req.query.q);
    res.status(200).json(data);    
};
