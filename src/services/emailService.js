const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bienestarsena08@gmail.com', // Correo que envía los mensajes
    pass: 'tvfh rsxk lvwo hiro', // Contraseña de la cuenta de envío
  },
});


async function sendEmail(to = [], subject, htmlContent) {
  if (!to.length) {
    throw new Error('No hay destinatarios para el correo');
  }

  const mailOptions = {
    from: '"Bienestar" <' + process.env.EMAIL_USER + '>',
    to,
    subject,
    html: htmlContent, // Enviar HTML en lugar de texto plano
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(`✅ Correo enviado a: ${to.join(', ')}`);
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    throw new Error(`No se pudo enviar el correo: ${error.message}`);
  }
}

module.exports = {
  sendEmail,
};
