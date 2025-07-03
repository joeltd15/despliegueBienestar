const Role = require('../models/role');

const getAllRoles = async () => {
  return await Role.find();
};

const getRoleById = async (id) => {
  return await Role.findById(id);
};

const createRole = async (data) => {
  const role = new Role(data);
  return await role.save();
};

const updateRole = async (id, data) => {
  const role = await Role.findById(id);
  if (!role) return null;

  role.name = data.name;
  role.permissions = data.permissions;
  return await role.save();
};

const deleteRole = async (id) => {
  return await Role.findByIdAndDelete(id);
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};
