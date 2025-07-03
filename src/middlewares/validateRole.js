const { body } = require('express-validator');
const Role = require('../models/role');

const validateRole = [
  body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .custom(async (value, { req }) => {
      const existing = await Role.findOne({ name: value.trim() });
      if (existing && (!req.params.id || existing._id.toString() !== req.params.id)) {
        throw new Error('Ya existe un rol con ese nombre');
      }
      return true;
    }),
];

module.exports = validateRole;
