const roleRepository = require('../repositories/roleRepository');

const getAllRoles = () => roleRepository.getAllRoles();

const getRoleById = (id) => roleRepository.getRoleById(id);

const createRole = (data) => roleRepository.createRole(data);

const updateRole = (id, data) => roleRepository.updateRole(id, data);

const deleteRole = (id) => roleRepository.deleteRole(id);

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};
