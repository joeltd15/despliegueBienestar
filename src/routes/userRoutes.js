const express = require('express');
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware(), userController.getAllUsers);
router.get('/:id', authMiddleware(), userController.getUsersByid);
router.put('/:id', authMiddleware(), validateUser, userController.updateUser);
router.delete('/:id', authMiddleware(), userController.deleteUser);

module.exports = router;