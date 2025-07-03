const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas públicas
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

// Solicitar código de recuperación
router.post('/forgot-password', authController.forgotPassword.bind(authController));

// Resetear la contraseña
router.post('/reset-password', authController.resetPassword.bind(authController));

// Cambiar contraseña (requiere autenticación)
router.post('/change-password', authMiddleware(), authController.changePassword.bind(authController));


module.exports = router;