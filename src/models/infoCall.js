const mongoose = require('mongoose');

const InfoCallSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },

  email: { type: String, required: true },
  trainingCenter: { type: String, required: true },
  trainingSite: { type: String, required: true },
  trainingModality: { type: String, required: true },
  fullName: { type: String, required: true },
  idType: { type: String, required: true },

  idDocumentPdf: { type: String, required: true },
  qualificationsCertificate: { type: String, required: true },
  idNumber: { type: String, required: true },
  programName: { type: String, required: true },
  recordNumber: { type: String, required: true },
  learnerEmail: { type: String, required: true },
  learnerPhone: { type: String, required: true },
  training_level: { type: String, required: true },
  trainingStartDate: { type: Date, required: true },
  trainingEndDate: { type: Date, required: true },

  gender: { type: String, required: true },
  age: { type: Number, required: true },

  hasDisability: { type: Boolean, required: true },
  disabilityCertificate: {
    type: String,
    required: function () {
      return this.hasDisability;
    }
  },

  isFromCommunity: { type: Boolean, required: true },
  communityCertificate: {
    type: String,
    required: function () {
      return this.isFromCommunity;
    }
  },

  isPeasant: { type: Boolean, required: true },
  peasantCertificate: {
    type: String,
    required: function () {
      return this.isPeasant;
    }
  },

  isSingleParent: { type: Boolean, required: true },
  singleParentCertificate: {
    type: String,
    required: function () {
      return this.isSingleParent;
    }
  },

  isVictim: { type: Boolean, required: true },
  victimCertificate: {
    type: String,
    required: function () {
      return this.isVictim;
    }
  },

  isPregnantOrNursing: { type: Boolean, required: true },
  pregnancyCertificate: {
    type: String,
    required: function () {
      return this.isPregnantOrNursing;
    }
  },

  isGenderViolenceVictim: { type: Boolean, required: true },

  displacedByNaturalPhenomena: { type: Boolean, required: true },
  displacementCertificate: {
    type: String,
    required: function () {
      return this.displacedByNaturalPhenomena;
    }
  },

  sisbenGroup: { type: String, required: true },
  sisbenCertificate: { type: String, required: true },

  bankCertificatePdf: { type: String, required: true },
  commitmentAct: { type: String, required: true },
  socioeconomicStudy: { type: String, required: true },

  learnerAddress: { type: String, required: true },

  isLearnerRepresentative: { type: Boolean, required: true },
  participatesInProjects: { type: Boolean, required: true },

  callId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Call',
    required: true
  }

}, {
  timestamps: true,
  collection: 'infoCalls'
});

module.exports = mongoose.model('InfoCall', InfoCallSchema);
