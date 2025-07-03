const callService = require('../services/callService');
const { sendResponse, sendError } = require('../utils/response');

// Obtener todas las convocatorias
const getAllCalls = async (req, res) => {
    try {
        const calls = await callService.getAllCalls();
        sendResponse(res, calls);
    } catch (error) {
        sendError(res, error);
    }
};

// Obtener una convocatoria por ID
const getCallById = async (req, res) => {
    try {
        const call = await callService.getCallById(req.params.id);
        if (!call) {
            return sendError(res, 'Convocatoria no encontrada', 404);
        }
        sendResponse(res, call);
    } catch (error) {
        sendError(res, error);
    }
};

// Crear una nueva convocatoria
const createCall = async (req, res) => {
    try {
        const newCall = await callService.createCall(req.body);
        sendResponse(res, newCall, 201);
    } catch (error) {
        sendError(res, error);
    }
};

// Actualizar una convocatoria
const updateCall = async (req, res) => {
    try {
        const updatedCall = await callService.updateCall(req.params.id, req.body);
        if (!updatedCall) {
            return sendError(res, 'Convocatoria no encontrada', 404);
        }
        sendResponse(res, 'Convocatoria actualizada correctamente');
    } catch (error) {
        sendError(res, error);
    }
};

// Eliminar una convocatoria
const deleteCall = async (req, res) => {
    try {
        const call = await callService.getCallById(req.params.id);
        if (!call) {
            return sendError(res, 'Convocatoria no encontrada', 404);
        }

        const deleted = await callService.deleteCall(req.params.id);
        if (!deleted) {
            return sendError(res, 'No se pudo eliminar la convocatoria', 400);
        }
        sendResponse(res, 'Convocatoria eliminada correctamente');
    } catch (error) {
        sendError(res, error);
    }
};

module.exports = {
    getAllCalls,
    getCallById,
    createCall,
    updateCall,
    deleteCall
};