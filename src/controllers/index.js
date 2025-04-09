const login = require('./login.controller');
const { newUser, getUsers, getUserById, deleteUser } = require('./user.controller');
const newCategory = require('./newCategory.controller');
const getCategories = require('./getCategories.controller');
const newPost = require('./newPost.controller');
const getPosts = require('./getPosts.controller');
const getPostById = require('./getPostById.controller');
const editPost = require('./editPost.controller');
const deletePost = require('./deletePost.controller');
const findPost = require('./findPost.controller');

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
  findPost,
};
