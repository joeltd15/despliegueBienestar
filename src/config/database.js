const mongoose = require('mongoose');
require('dotenv').config();

let practicasConnection = null;

const connectDB = async () => {
  try {
    // Conexión principal a DbBienestar
    await mongoose.connect(process.env.MONGO_URI_BIENESTAR);
    console.log("✅ Conectado a DbBienestar");
    
    practicasConnection = await mongoose.createConnection(process.env.MONGO_URI_PRACTICAS);
    console.log("✅ Conectado a saraPracticas");

  } catch (error) {
    console.error("❌ Error en las conexiones MongoDB:", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  getPracticasConnection: () => practicasConnection
};