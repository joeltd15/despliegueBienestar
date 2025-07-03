const mongoose = require('mongoose');
const User = require('./user');
const Call = require('./call');
const infoCall = require('./infoCall');
const Role = require('./role');
const infoCallScore = require('./infoCallScore');

const models = {
  User,
  Call,
  infoCall,
  Role,
  infoCallScore
};

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Conectado a MongoDB correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = { models, connectDb };