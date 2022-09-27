const services = require('../services/newUser.service');
const generateToken = require('../utils/generateToken');

module.exports = async (req, res) => {
    const data = await services(req.body);

    if (data.type) {
        return res.status(data.type).json({ message: data.message });
    }
    const token = generateToken(data.message);

    res.status(201).json({ token });
};
