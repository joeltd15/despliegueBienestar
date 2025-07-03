const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
    required: true
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },

  resetPasswordToken: {
    type: String,
    default: null
  },

  resetPasswordExpires: {
    type: Date,
    default: null
  }

}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);