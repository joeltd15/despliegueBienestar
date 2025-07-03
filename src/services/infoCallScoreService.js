const InfoCall = require('../models/infoCall');
const infoCallScoreRepository = require('../repositories/infoCallScoreRepository');

const generateScoresForAllInfoCalls = async () => {
  const allInfoCalls = await InfoCall.find();
  const createdScores = [];

  for (const infoCall of allInfoCalls) {
    const existing = await infoCallScoreRepository.getScoreByInfoCallId(infoCall._id);
    if (!existing) {
      const scoreData = calculateScore(infoCall);
      const saved = await infoCallScoreRepository.createScore(scoreData);
      createdScores.push(saved);
    }
  }

  return createdScores;
};

const generateScoreForInfoCall = async (infoCall) => {
  const existing = await infoCallScoreRepository.getScoreByInfoCallId(infoCall._id);
  if (existing) {
    throw new Error(`Ya existe un puntaje para el InfoCall con ID ${infoCall._id}`);
  }

  const scoreData = calculateScore(infoCall);
  return await infoCallScoreRepository.createScore(scoreData);
};


const calculateScore = (infoCall) => {
  let total = 0;
  const result = {
    infoCallId: infoCall._id
  };

  if (infoCall.hasDisability) {
    result.disabilityPoints = 15;
    total += 15;
  }

  if (infoCall.isFromCommunity) {
    result.communityPoints = 15;
    total += 15;
  }

  if (infoCall.isPeasant) {
    result.peasantPoints = 15;
    total += 15;
  }

  if (infoCall.isSingleParent) {
    result.singleParentPoints = 10;
    total += 10;
  }

  if (infoCall.isVictim) {
    result.victimPoints = 10;
    total += 10;
  }

  if (infoCall.isPregnantOrNursing) {
    result.pregnancyPoints = 10;
    total += 10;
  }

  if (infoCall.isGenderViolenceVictim) {
    result.genderViolencePoints = 10;
    total += 10;
  }

  if (infoCall.displacedByNaturalPhenomena) {
    result.displacementPoints = 5;
    total += 5;
  }

  const grupo = infoCall.sisbenGroup?.toUpperCase();
  if (['A1', 'A2', 'A3', 'A4', 'A5'].includes(grupo)) {
    result.sisbenGroup = grupo;
    result.sisbenPoints = 10;
    total += 10;
  } else if (['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'].includes(grupo)) {
    result.sisbenGroup = grupo;
    result.sisbenPoints = 5;
    total += 5;
  }

  if (infoCall.isLearnerRepresentative) {
    result.representativePoints = 5;
    total += 5;
  }

  if (infoCall.participatesInProjects) {
    result.projectParticipationPoints = 5;
    total += 5;
  }

  result.totalScore = total;
  result.status = 'Sin revisar';

  return result;
};

const getScoreByInfoCallId = async (id) => {
  return await infoCallScoreRepository.getScoreByInfoCallId(id);
};

const getAllScores = async () => {
  return await infoCallScoreRepository.getAllScores();
};

const updateScoreStatus = async (id, status) => {
  return await infoCallScoreRepository.updateScoreStatus(id, status);
};

const recalculateTotal = (data) => {
  return (
    (data.disabilityPoints || 0) +
    (data.communityPoints || 0) +
    (data.peasantPoints || 0) +
    (data.singleParentPoints || 0) +
    (data.victimPoints || 0) +
    (data.pregnancyPoints || 0) +
    (data.genderViolencePoints || 0) +
    (data.displacementPoints || 0) +
    (data.sisbenPoints || 0) +
    (data.representativePoints || 0) +
    (data.projectParticipationPoints || 0)
  );
};

const updateScore = async (id, data) => {
  const total = recalculateTotal(data);
  return await infoCallScoreRepository.updateScore(id, { ...data, totalScore: total });
};

module.exports = {
  generateScoresForAllInfoCalls,
  generateScoreForInfoCall,
  getScoreByInfoCallId,
  getAllScores,
  updateScoreStatus,
  updateScore
};