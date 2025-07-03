const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },

  slots: {
    type: Number,
    required: true
  },

  callNumber: {
    type: String,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },

  endDate: {
    type: Date,
    required: true
  },
  
  status: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
    required: true
  },

}, {
  timestamps: true,
  collection: 'calls'
});

module.exports = mongoose.model('Call', CallSchema);