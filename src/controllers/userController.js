const userService = require('../services/userService');
const { sendResponse, sendError } = require('../utils/response');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    sendResponse(res, users);
  } catch (error) {
    sendError(res, error);
  }
};

// Obtener usuario por ID
const getUsersByid = async (req, res) => {
  try {
    const user = await userService.getUserByid(req.params.id);
    if (!user) return sendError(res, 'Usuario no encontrado', 404);
    sendResponse(res, user);
  } catch (error) {
    sendError(res, error);
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) return sendError(res, 'Usuario no encontrado', 404);
    sendResponse(res, 'Usuario actualizado correctamente');
  } catch (error) {
    sendError(res, error);
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return sendError(res, 'Usuario no encontrado', 404);
    sendResponse(res, 'Usuario eliminado correctamente');
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getAllUsers,
  getUsersByid,
  updateUser,
  deleteUser
};