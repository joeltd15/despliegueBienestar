
const infoCallService = require('../services/infoCallService');
const InfoCall = require('../models/infoCall');
const { sendEmail } = require('../services/emailService');
const { sendResponse, sendError } = require('../utils/response');
const path = require('path');
const fs = require('fs');

const createInfoCall = async (req, res) => {
  try {
    const info = await infoCallService.createInfoCall(req.body);

    // Contenido del correo
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #005a8c; text-align: center;">🎉 Registro Exitoso en la Convocatoria</h2>
        <p><strong>👤 Nombre:</strong> ${info.fullName}</p>
        <p><strong>📅 Fecha de registro:</strong> ${new Date(info.createdAt).toLocaleDateString()}</p>
        <hr>
        <p style="text-align: center;">
          ✅ Tu registro ha sido procesado con éxito. Te contactaremos con más información pronto.<br><br>
          Centro de servicios y gestión empresarial.<br>
          <span style="color: #005a8c; font-weight: bold;">Equipo de Bienestar SENA</span>
        </p>
      </div>
    `;

    await sendEmail([info.email], '🎉 Registro exitoso en la convocatoria', htmlContent);

    sendResponse(res, info, 201);
  } catch (error) {
    sendError(res, error);
  }
};

const getAllInfoCalls = async (req, res) => {
  try {
    const infoCalls = await infoCallService.getAllInfoCalls();
    sendResponse(res, infoCalls);
  } catch (error) {
    sendError(res, error);
  }
};

const getInfoCallById = async (req, res) => {
  try {
    const info = await infoCallService.getInfoCallById(req.params.id);
    if (!info) return sendError(res, 'InfoCall not found', 404);
    sendResponse(res, info);
  } catch (error) {
    sendError(res, error);
  }
};

const deleteInfoCall = async (req, res) => {
  try {
    const deleted = await infoCallService.deleteInfoCall(req.params.id);
    if (!deleted) return sendError(res, 'InfoCall not found', 404);
    sendResponse(res, 'InfoCall deleted successfully');
  } catch (error) {
    sendError(res, error);
  }
};

const mergePdfs = async (req, res) => {
  try {
    const { id } = req.params

    const result = await infoCallService.mergePdfsById(id)

    // Configurar headers para descarga de archivo
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", `attachment; filename="${result.fileName}"`)
    res.setHeader("Content-Length", result.pdfBuffer.length)

    // Enviar el PDF como respuesta
    res.send(Buffer.from(result.pdfBuffer))
  } catch (error) {
    console.error("Error in mergePdfs:", error)
    sendError(res, error.message, 500)
  }
}

const getByDocument = async (req, res) => {
  try {
    const { idNumber } = req.params;
    const existing = await InfoCall.findOne({ idNumber });

    if (!existing) {
      return res.status(404).json({ message: 'No registrado' });
    }

    res.status(200).json(existing);
  } catch (error) {
    console.error("Error al verificar documento:", error);
    res.status(500).json({ message: 'Error al verificar documento' });
  }
};

module.exports = {
  createInfoCall,
  getAllInfoCalls,
  getInfoCallById,
  deleteInfoCall,
  mergePdfs,
  getByDocument
};
