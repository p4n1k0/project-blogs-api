const login = require('./login.controller');
const newUser = require('./newUser.controller');
const getUsers = require('./getUsers.controller');
const getUserById = require('./getUserById.controller');
const newCategory = require('./newCategory.controller');
const getCategories = require('./getCategories.controller');
const newPost = require('./newPost.controller');
const getPosts = require('./getPosts.controller');
const getPostById = require('./getPostById.controller');
const editPost = require('./editPost.controller');
const deletePost = require('./deletePost.controller');
const deleteUser = require('./deleteUser.controller');

module.exports = {
  login,
  newUser,
  getUsers,
  getUserById,
  newCategory,
  getCategories,
  newPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
  deleteUser,

};
