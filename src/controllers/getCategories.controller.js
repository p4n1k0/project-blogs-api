const service = require('../services/getCategories.service');

module.exports = async (_req, res) => {
    const data = await service();

    res.status(200).json(data);
};
