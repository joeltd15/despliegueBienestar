const { param } = require('express-validator');
const { getEstudiantesService, getStudentByDocumentService } = require('../services/infoStudentsService');

const getEstudiantesController = async (req, res) => {
    try {
        const estudents = await getEstudiantesService();
        res.status(200).json(estudents);
    } catch (error) {
        console.error("❌ Error en el controlador:", error);
        res.status(500).json({ message: 'Error al obtener los estudiantes' });
    }
};

const getStudentByDocumentController = async (req, res) => {
    try {
        const { document } = req.params;

        if (!document) {
            return res.status(400).json({ message: 'Debe proporcionar un documento' })
        }

        const student = await getStudentByDocumentService(document);

        if (!student) {
            return res.status(404).json({ message: 'Usted no se encuentra matriculado dentro de un programa de formación. Para mas información dirigirse a bienestar del aprendiz' });
        }

        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el estudiante' });
    }
}

module.exports = {
    getEstudiantesController,
    getStudentByDocumentController
};
