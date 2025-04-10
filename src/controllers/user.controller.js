const service = require('../services/user.service');
const generateToken = require('../utils/generateToken');


const newUser = async (req, res) => {
  const data = await service.newUser(req.body);
  if (data.type) return res.status(data.type).json({ message: data.message });
  
  const token = generateToken(data.message);
  res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
  const data = await service.getUsers();
  res.status(200).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const data = await service.getUserById(id);
  if (data) return res.status(200).json(data);
  res.status(404).json({ message: 'User does not exist' });
};

const deleteUser = async (req, res) => {
  await service.deleteUser(req.hashToken.email);
  res.status(204).end();
};


module.exports = {
  newUser,
  getUsers,
  getUserById,
  deleteUser
};
