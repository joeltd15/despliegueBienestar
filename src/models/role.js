const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  permissions: [{
    type: String,
    trim: true,
    enum: [
      'Roles',
      'Usuarios',
      'Convocatorias',
      'Puntajes',
      'Dashboard'
    ]
  }]
}, {
  collection: 'roles',
  timestamps: true
});

module.exports = mongoose.model('Role', RoleSchema);
