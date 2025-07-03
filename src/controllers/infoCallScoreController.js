const infoCallScoreService = require('../services/infoCallScoreService');
const InfoCall = require('../models/infoCall');
const { sendResponse, sendError } = require('../utils/response');


const generateScore = async (req, res) => {
  try {
    const infoCall = await InfoCall.findById(req.params.id);
    if (!infoCall) {
      return res.status(404).json({ error: 'InfoCall no encontrado' });
    }

    const score = await infoCallScoreService.generateScoreForInfoCall(infoCall);
    res.status(201).json(score);
  } catch (error) {
    if (error.message.includes('Ya existe un puntaje')) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Error al generar puntaje' });
  }
};


const getScoreByInfoCallId = async (req, res) => {
  try {
    const score = await infoCallScoreService.getScoreByInfoCallId(req.params.id);
    if (!score) {
      return res.status(404).json({ error: 'Puntaje no encontrado' });
    }

    sendResponse(res, score)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el puntaje' });
  }
};

const getAllScores = async (req, res) => {
  try {
    const scores = await infoCallScoreService.getAllScores();
    sendResponse(res, scores)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los puntajes' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await infoCallScoreService.updateScoreStatus(req.params.id, status);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};

const updateScore = async (req, res) => {
  try {
    const updated = await infoCallScoreService.updateScore(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar puntaje' });
  }
};

const generateScores = async (req, res) => {
  try {
    const scores = await infoCallScoreService.generateScoresForAllInfoCalls();
    res.status(201).json({
      message: `${scores.length} puntajes generados`,
      scores
    });
  } catch (error) {
    console.error('Error generando puntajes:', error);
    res.status(500).json({ error: 'Error generando puntajes' });
  }
};

module.exports = {
  generateScore,
  getScoreByInfoCallId,
  getAllScores,
  updateStatus,
  updateScore,
  generateScores
};
