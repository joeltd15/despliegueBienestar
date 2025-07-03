const roleService = require('../services/roleService');
const { sendResponse, sendError } = require('../utils/response');

const VALID_PERMISSIONS = [
      'Roles',
      'Usuarios',
      'Convocatorias',
      'Puntajes',
      'Dashboard'
  ];

//Validacion de los permisos enviados al registrar un rol, listado de permisos permitidos en VALID_PERMISSIONS
const validatePermissions = (permissions) => {
  const invalid = permissions.filter(p => !VALID_PERMISSIONS.includes(p));
  return invalid;
};

const createRole = async (req, res) => {
  try {
    const { name, permissions = [] } = req.body;
    const invalid = validatePermissions(permissions);
    if (invalid.length > 0) {
      return sendError(res, `Permisos inválidos: ${invalid.join(', ')}`, 400);
    }

    const newRole = await roleService.createRole({ name, permissions });
    sendResponse(res, { message: 'Rol creado exitosamente', role: newRole }, 201);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.name) {
      return sendError(res, 'Ya existe un rol con ese nombre', 400);
    }
    sendError(res, error);
  }
};

const updateRole = async (req, res) => {
  try {
    const { name, permissions = [] } = req.body;
    const invalid = validatePermissions(permissions);
    if (invalid.length > 0) {
      return sendError(res, `Permisos inválidos: ${invalid.join(', ')}`, 400);
    }

    const updatedRole = await roleService.updateRole(req.params.id, { name, permissions });
    if (!updatedRole) return sendError(res, 'Rol no encontrado', 404);
    sendResponse(res, 'Rol actualizado exitosamente');
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.name) {
      return sendError(res, 'Ya existe un rol con ese nombre', 400);
    }
    sendError(res, error);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    sendResponse(res, roles);
  } catch (error) {
    sendError(res, error);
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) return sendError(res, 'Rol no encontrado', 404);
    sendResponse(res, role);
  } catch (error) {
    sendError(res, error);
  }
};

const deleteRole = async (req, res) => {
  try {
    const deleted = await roleService.deleteRole(req.params.id);
    if (!deleted) return sendError(res, 'Rol no encontrado', 404);
    sendResponse(res, 'Rol eliminado correctamente');
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};
