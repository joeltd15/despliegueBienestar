const authService = require('../services/authServices');
const { sendResponse, sendError } = require('../utils/response');

class AuthController {
  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      sendResponse(res, result, 201);
    } catch (error) {
      sendError(res, error.message, 400);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      sendResponse(res, result);
    } catch (error) {
      sendError(res, error.message, 401);
    }
  }

  async sendResetCodeController(req, res) {
    try {
      console.log("Body recibido:", req.body); // <-- Verifica qué llega en el body
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ error: "Email es requerido" });
      }
  
      const response = await authService.sendResetCode(email);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const result = await authService.sendResetCode(email);
      sendResponse(res, result);
    } catch (error) {
      sendError(res, error.message, 400);
    }
  }

  async changePassword(req, res) {
    try {
      const userId = req.user.id; // ID del usuario autenticado
      const { currentPassword, newPassword, confirmPassword } = req.body;
  
      const result = await authService.changePassword(userId, currentPassword, newPassword, confirmPassword);
      sendResponse(res, result);
    } catch (error) {
      sendError(res, error.message, 400);
    }
  }
  

  async resetPassword(req, res) {
    try {
      const { email, resetCode, newPassword } = req.body;
      const result = await authService.resetPassword(email, resetCode, newPassword);
      sendResponse(res, result);
    } catch (error) {
      sendError(res, error.message, 400);
    }
  }
}

module.exports = new AuthController();