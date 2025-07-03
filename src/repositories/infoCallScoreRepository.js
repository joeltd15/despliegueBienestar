const InfoCallScore = require('../models/infoCallScore');

const createScore = async (data) => {
  return await InfoCallScore.create(data);
};

const getScoreByInfoCallId = async (infoCallId) => {
  return await InfoCallScore.findOne({ infoCallId });
};

const getAllScores = async () => {
  return await InfoCallScore.find();
};

const updateScoreStatus = async (id, status) => {
  return await InfoCallScore.findByIdAndUpdate(id, { status }, { new: true });
};

const updateScore = async (id, data) => {
  return await InfoCallScore.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  createScore,
  getScoreByInfoCallId,
  getAllScores,
  updateScoreStatus,
  updateScore
};
