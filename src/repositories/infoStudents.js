const { getPracticasConnection } = require('../config/database');

const getEstudiantes = async () => {
  try {
    const db = getPracticasConnection();
    const estudents = await db.collection('courses_students').find({}).toArray();
    return estudents;
  } catch (error) {
    throw new Error('Error al obtener estudiantes desde saraPracticas');
  }
};

const getEstudentByDocument = async (document) => {
  try {
    const db = getPracticasConnection();
    const estudent = await db.collection('courses_students').findOne({document: document})
    return estudent;
  } catch (error) {
    throw new Error('Error al obtener el estudiante por documento');
  }
};

module.exports = {
  getEstudiantes,
  getEstudentByDocument
};
