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

const newUser = async (newUser) => {
  const { error } = user.validate(newUser);
  if (error) return { type: 400, message: error.message };

  const data = await User.findAll({ where: { email: newUser.email } });
  if (data.length !== 0) return { type: 409, message: 'User already registered' };

  await User.create(newUser);
  const payload = newUser;  
  delete payload.password;
  return { type: null, message: payload };
};


const attributes = ['id', 'displayName', 'email', 'image'];
const getUsers = async () => {
  const data = await User.findAll({ attributes: attributes });
  return data;
};


const getUserById = async (id) => {
  const data = await User.findOne({ where: { id }, attributes: attributes });
  return data;
};

const deleteUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  user.destroy();
};


module.exports = {
  newUser,
  getUsers,
  getUserById,
  deleteUser,
};
