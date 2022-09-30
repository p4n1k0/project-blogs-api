const { User } = require('../models');

module.exports = async (id) => {
    const data = await User.findOne({
        where: { id },
        attributes: [
            'id',
            'displayName',
            'email',
            'image',
        ],
    });
    return data;
};
