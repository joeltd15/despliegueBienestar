const infoCallRepository = require('../repositories/infoCallRepository');
const { PDFDocument } = require("pdf-lib");
const AWS = require("aws-sdk");
const { generateSignedUrl } = require("../services/s3Service"); // importa aquí

const createInfoCall = async (data) => {
  return await infoCallRepository.createInfoCall(data);
};

const getAllInfoCalls = async () => {
  return await infoCallRepository.getAllInfoCalls();
};

const getInfoCallById = async (id) => {
  const infoCall = await infoCallRepository.getInfoCallById(id);

  if (!infoCall) return null;

  const fieldsToSign = [
    "idDocumentPdf",
    "qualificationsCertificate",
    "sisbenCertificate",
    "bankCertificatePdf",
    "commitmentAct",
    "socioeconomicStudy",
    "quartersCertificate",
  ];

  const signedInfo = { ...infoCall._doc };

  for (const field of fieldsToSign) {
    const originalUrl = signedInfo[field];
    if (originalUrl) {
      try {
        const key = decodeURIComponent(originalUrl.split("/").pop());
        signedInfo[field] = await generateSignedUrl(key);
      } catch (error) {
        console.warn(`⚠️ No se pudo firmar el campo ${field}: ${error.message}`);
      }
    }
  }

  return signedInfo;
};


const deleteInfoCall = async (id) => {
  return await infoCallRepository.deleteInfoCall(id);
};

// Configuración de conexión a Wasabi S3
const s3 = new AWS.S3({
  accessKeyId: process.env.WASABI_ACCESS_KEY,
  secretAccessKey: process.env.WASABI_SECRET_KEY,
  endpoint: process.env.WASABI_ENDPOINT,
  region: process.env.WASABI_REGION,
});

// Obtener el buffer del archivo PDF desde Wasabi
const getPdfBufferFromWasabi = async (key) => {
  const params = {
    Bucket: process.env.WASABI_BUCKET,
    Key: key,
  };
  const data = await s3.getObject(params).promise();
  return data.Body;
};

const mergePdfsById = async (id) => {
  try {
    const result = await infoCallRepository.getPdfPathsById(id);

    if (!result) {
      throw new Error("registro no encontrado");
    }

    const { infoCall, pdfPaths } = result;

    if (pdfPaths.length === 0) {
      throw new Error("No hay documentos PDF en este registro");
    }

    const mergedPdf = await PDFDocument.create();

    for (const pdfInfo of pdfPaths) {
      try {
        // Obtener el archivo desde Wasabi por key
        const pdfBytes = await getPdfBufferFromWasabi(pdfInfo.key);

        const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

        pages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      } catch (fileError) {
        console.warn(`Error al procesar archivo ${pdfInfo.name}: ${fileError.message}`);
      }
    }

    if (mergedPdf.getPageCount() === 0) {
      throw new Error("No se pudo procesar ningún archivo PDF válido");
    }

    const mergedPdfBytes = await mergedPdf.save();

    return {
      pdfBuffer: mergedPdfBytes,
      fileName: `${infoCall.fullName.replace(/\s+/g, "_")}_documentos_completos.pdf`,
      infoCall,
    };
  } catch (error) {
    throw new Error(`Error al unir PDFs: ${error.message}`);
  }
};

module.exports = {
  createInfoCall,
  getAllInfoCalls,
  getInfoCallById,
  deleteInfoCall,
  mergePdfsById,
};
