const login = require('./login.controller');
const newUser = require('./newUser.controller');
const getUsers = require('./getUsers.controller');
const getUserById = require('./getUserById.controller');
const newCategory = require('./newCategory.controller');
const getCategories = require('./getCategories.controller');
const newPost = require('./newPost.controller');

module.exports = {
  login,
  newUser,
  getUsers,
  getUserById,
  newCategory,
  getCategories,
  newPost,
};
