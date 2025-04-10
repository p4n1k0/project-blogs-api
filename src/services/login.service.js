const { User } = require('../models');

module.exports = async (body) => {
    if (!body.email || !body.password) return { type: 'Some required fields are missing' };
    
    const data = await User.findAll({ where: { email: body.email, password: body.password } });
    if (data.length === 0) return { type: 'Invalid fields' };
    return { type: null };
};
