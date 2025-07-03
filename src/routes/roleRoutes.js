const express = require('express');
const roleController = require('../controllers/roleController');
const validateRole = require('../middlewares/validateRole');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware(), roleController.getAllRoles);
router.get('/:id', authMiddleware(), roleController.getRoleById);
router.post('/', validateRole, authMiddleware(), roleController.createRole);
router.put('/:id', validateRole,authMiddleware(), roleController.updateRole);
router.delete('/:id', authMiddleware(), roleController.deleteRole);

module.exports = router;