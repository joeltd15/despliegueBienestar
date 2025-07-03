const practicasRepository = require('../repositories/infoStudents');

const getEstudiantesService = async () => {
  return await practicasRepository.getEstudiantes();
};

const getStudentByDocumentService  = async (document) => {
    return await practicasRepository.getEstudentByDocument(document);
}

module.exports = {
  getEstudiantesService,
  getStudentByDocumentService
};
