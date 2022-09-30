const login = require('./login.controller');
const newUser = require('./newUser.controller');
const getUsers = require('./getUsers.controller');
const getUserById = require('./getUserById.controller');

module.exports = {
  login,
  newUser,
  getUsers,
  getUserById,
};
