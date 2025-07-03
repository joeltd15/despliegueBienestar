const User = require('../models/user');

const getAllUsers = async () => {
  return await User.find().populate({
    path: 'role',
    select: 'name permissions',
    populate: {
      path: 'permissions',
      select: 'name'
    }
  });
};

const getUserByid = async (id) => {
  return await User.findById(id).populate({
    path: 'role',
    select: 'name permissions',
    populate: {
      path: 'permissions',
      select: 'name'
    }
  });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserByPhone = async (phone) => {
  return await User.findOne({ phone });
};

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getUserByid,
  findUserByEmail,
  findUserByPhone,
  createUser,
  updateUser,
  deleteUser
};