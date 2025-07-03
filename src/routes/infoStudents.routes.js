const express = require('express');
const router = express.Router();
const { getEstudiantesController, getStudentByDocumentController } = require('../controllers/infoStudentsController');

router.get('/', getEstudiantesController);
router.get('/:document', getStudentByDocumentController);

module.exports = router;
