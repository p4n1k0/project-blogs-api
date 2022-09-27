const Joi = require('joi');
const { User } = require('../models');

const userName = Joi.string().min(8).required();
const userEmail = Joi.string().email().required();
const userPassword = Joi.string().min(6).required();
const userImage = Joi.string();

const tables = Joi.object({
    displayName: userName,
    email: userEmail,
    password: userPassword,
    image: userImage,
});

module.exports = async (obj) => {
    const { error } = tables.validate(obj);

    if (error) {
        return { type: 400, message: error.message };
    }

    const data = await User.findAll({ where: { email: obj.email } });

    if (data.length !== 0) {
        return { type: 409, message: 'User already registered' };
    }

    await User.create(obj);

    const payload = obj;
    delete payload.password;

    return { type: null, message: payload };
};
