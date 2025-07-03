const userRepository = require('../repositories/userRepository');

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

const getUserByid = async (id) => {
  return await userRepository.getUserByid(id);
};

const updateUser = async (id, data) => {
  return await userRepository.updateUser(id, data);
};

const deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUserByid,
  updateUser,
  deleteUser
};