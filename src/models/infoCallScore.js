const mongoose = require('mongoose');

const InfoCallScoreSchema = new mongoose.Schema({
  infoCallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InfoCall',
    required: true,
    unique: true
  },

  totalScore: { type: Number, default: 0 },

  disabilityPoints: { type: Number, default: 0 },
  communityPoints: { type: Number, default: 0 },
  peasantPoints: { type: Number, default: 0 },
  singleParentPoints: { type: Number, default: 0 },
  victimPoints: { type: Number, default: 0 },
  pregnancyPoints: { type: Number, default: 0 },
  genderViolencePoints: { type: Number, default: 0 },
  displacementPoints: { type: Number, default: 0 },
  sisbenGroup: { type: String },
  sisbenPoints: { type: Number, default: 0 },
  representativePoints: { type: Number, default: 0 },
  projectParticipationPoints: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ['Sin revisar', 'Revisado'],
    default: 'Sin revisar'
  }

}, {
  timestamps: true,
  collection: 'infoCallScores'
});

module.exports = mongoose.model('InfoCallScore', InfoCallScoreSchema);
