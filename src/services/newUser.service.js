const Joi = require('joi');
const { User } = require('../models');

const userName = Joi.string().min(8).required();
const userEmail = Joi.string().email().required();
const userPassword = Joi.string().min(6).required();
const userImage = Joi.string();

const user = Joi.object({
    displayName: userName,
    email: userEmail,
    password: userPassword,
    image: userImage,
});

module.exports = async (newUser) => {
    const { err } = user.validate(newUser);

    if (err) {
        return { type: 400, message: err.message };
    }
    const data = await User.findAll({ where: { email: newUser.email } });

    if (data.length !== 0) {
        return { type: 409, message: 'User already registered' };
    }

    await User.create(newUser);

    const payload = newUser;
    delete payload.password;

    return { type: null, message: payload };
};
