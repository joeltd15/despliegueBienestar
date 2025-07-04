
const InfoCall = require('../models/infoCall');
const { URL } = require("url");

const createInfoCall = async (data) => {
  const infoCall = new InfoCall(data);
  return await infoCall.save();
};

const getAllInfoCalls = async () => {
  return await InfoCall.find().populate('callId');
};

const getInfoCallById = async (id) => {
  return await InfoCall.findById(id).populate('callId');
};

const deleteInfoCall = async (id) => {
  return await InfoCall.findByIdAndDelete(id);
};

const getPdfPathsById = async (id) => {
  const infoCall = await InfoCall.findById(id);
  if (!infoCall) return null;

  const pdfFields = [
    "idDocumentPdf",
    "qualificationsCertificate",
    "socioeconomicStudy",
    "sisbenCertificate",
    "bankCertificatePdf",
    "commitmentAct",
  ];

  const pdfPaths = [];

  pdfFields.forEach((field) => {
    if (infoCall[field]) {
      try {
        const url = new URL(infoCall[field]);
        const key = decodeURIComponent(url.pathname.substring(1)); // Elimina la barra inicial "/"

        pdfPaths.push({
          name: field,
          key,
        });
      } catch (e) {
        console.warn(`❌ URL inválida en campo ${field}: ${infoCall[field]}`);
      }
    }
  });

  return { infoCall, pdfPaths };
};


module.exports = {
  createInfoCall,
  getAllInfoCalls,
  getInfoCallById,
  deleteInfoCall,
  getPdfPathsById,
};