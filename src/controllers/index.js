const login = require('./login.controller');
const { newUser, getUsers, getUserById, deleteUser } = require('./user.controller');
const { newCategory, getCategories } = require('./category.controller');
const { newPost, getPosts, getPostById, deletePost, editPost, findPost } = require('./posts.controller');


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
