const infoCallRepository = require('../repositories/infoCallRepository');
const { PDFDocument } = require("pdf-lib")
const fs = require("fs").promises
const path = require("path")

const createInfoCall = async (data) => {
  return await infoCallRepository.createInfoCall(data);
};

const getAllInfoCalls = async () => {
  return await infoCallRepository.getAllInfoCalls();
};

const getInfoCallById = async (id) => {
  return await infoCallRepository.getInfoCallById(id);
};

const deleteInfoCall = async (id) => {
  return await infoCallRepository.deleteInfoCall(id);
};

const mergePdfsById = async (id) => {
  try {
    const result = await infoCallRepository.getPdfPathsById(id)

    if (!result) {
      throw new Error("registro no encontrado")
    }

    const { infoCall, pdfPaths } = result

    if (pdfPaths.length === 0) {
      throw new Error("No hay documentos PDF en este registro")
    }

    const mergedPdf = await PDFDocument.create()

    // Procesar cada archivo PDF
    for (const pdfInfo of pdfPaths) {
      try {
        // Leer el archivo PDF
        const pdfBytes = await fs.readFile(pdfInfo.path)

        // Cargar el PDF
        const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })

        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())

        pages.forEach((page) => {
          mergedPdf.addPage(page)
        })
      } catch (fileError) {
        console.warn(`Error processing file ${pdfInfo.name}: ${fileError.message}`)
      }
    }

    if (mergedPdf.getPageCount() === 0) {
      throw new Error("No valid PDF files could be processed")
    }

    const mergedPdfBytes = await mergedPdf.save()

    return {
      pdfBuffer: mergedPdfBytes,
      fileName: `${infoCall.fullName.replace(/\s+/g, "_")}_documentos_completos.pdf`,
      infoCall,
    }
  } catch (error) {
    throw new Error(`Error merging PDFs: ${error.message}`)
  }
}


module.exports = {
  createInfoCall,
  getAllInfoCalls,
  getInfoCallById,
  deleteInfoCall,
  mergePdfsById
};
