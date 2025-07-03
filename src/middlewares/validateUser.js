const { body, validationResult } = require('express-validator');
const { models } = require('../models');

const validateUser = [
    body('name').optional().notEmpty().withMessage('El nombre es requerido'),
    body('password').optional().notEmpty().withMessage('La contraseña es requerida'),
    body('status').optional()
        .isIn(['Activo', 'Inactivo']).withMessage('El estado debe ser A (Activo) o I (Inactivo)'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;