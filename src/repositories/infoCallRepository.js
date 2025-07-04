
const InfoCall = require('../models/infoCall');

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
  const infoCall = await InfoCall.findById(id)
  if (!infoCall) return null

  const pdfFields = [
    "socioeconomicStudy",
    "qualificationsCertificate",
    "idDocumentPdf",
    "sisbenCertificate",
    "disabilityCertificate",
    "communityCertificate",
    "victimCertificate",
    "singleParentCertificate",
    "pregnancyCertificate",
    "displacementCertificate",
    "peasantCertificate",
    "bankCertificatePdf",
    "commitmentAct",
  ];

  const pdfPaths = [];

  const wasabiUrlPrefix = `https://${process.env.WASABI_BUCKET}.${process.env.WASABI_ENDPOINT}/`;

  pdfFields.forEach((field) => {
    if (infoCall[field]) {
      const fullUrl = infoCall[field];
      const key = fullUrl.replace(wasabiUrlPrefix, "");
      pdfPaths.push({
        name: field,
        key,
      });
    }
  });

  return {
    infoCall,
    pdfPaths,
  };
};


module.exports = {
  createInfoCall,
  getAllInfoCalls,
  getInfoCallById,
  deleteInfoCall,
  getPdfPathsById,
};