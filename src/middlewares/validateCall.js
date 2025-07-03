const { body, validationResult } = require('express-validator');

const validateCall = [
  body('type')
    .notEmpty().withMessage('El campo "type" es obligatorio')
    .isString().withMessage('El campo "type" debe ser una cadena de texto'),

  body('slots')
    .notEmpty().withMessage('El campo "slots" es obligatorio')
    .isInt({ min: 1 }).withMessage('El campo "slots" debe ser un número entero mayor a 0'),

  body('callNumber')
    .notEmpty().withMessage('El campo "callNumber" es obligatorio')
    .isString().withMessage('El campo "callNumber" debe ser una cadena de texto'),

  body('year')
    .notEmpty().withMessage('El campo "year" es obligatorio')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('El campo "year" debe ser un año válido'),

  body('startDate')
    .notEmpty().withMessage('El campo "startDate" es obligatorio')
    .isISO8601().withMessage('El campo "startDate" debe tener un formato de fecha válido'),

  body('endDate')
    .notEmpty().withMessage('El campo "endDate" es obligatorio')
    .isISO8601().withMessage('El campo "endDate" debe tener un formato de fecha válido'),
  
  body('status').optional()
    .isIn(['Activo', 'Inactivo']).withMessage('El estado debe ser A (Activo) o I (Inactivo)'),

  // Middleware para capturar errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = validateCall;
