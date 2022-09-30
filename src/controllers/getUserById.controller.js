const service = require('../services/getUserById.service');

module.exports = async (req, res) => {
    const { id } = req.params;
    const data = await service(id);

    if (data) {
        return res.status(200).json(data);
    }
    res.status(404).json({ message: 'User does not exist' });
};
