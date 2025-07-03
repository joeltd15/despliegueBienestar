const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./src/config/database');

const User = require("./src/routes/userRoutes");
const Auth = require("./src/routes/authRoutes");
const StudentsRouts = require('./src/routes/infoStudents.routes');
const Call = require("./src/routes/callroutes");
const infoCallRoutes = require('./src/routes/infoCallRoutes');
const Role = require('./src/routes/roleRoutes');
const Documents = require("./src/routes/documentsValidationsRoutes.js");
const infoCallScoreRoutes = require('./src/routes/infoCallScoreRoutes');

const app = express();
const PORT = process.env.PORT || 2025;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use("/api/user", User);
app.use("/api/auth", Auth);
app.use("/api/students", StudentsRouts);
app.use('/api/calls', Call);
app.use('/api/infocalls', infoCallRoutes);
app.use('/api/role', Role);
app.use('/api/documents', Documents);
app.use('/api/scores', infoCallScoreRoutes);

app.get('/', (req, res) => {
  res.send('HOLA');
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
