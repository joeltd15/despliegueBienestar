const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const userRepository = require('../repositories/userRepository');

class AuthService {
  generateResetCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async sendResetCode(email) {
    console.log("Email recibido:", email);
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('El correo no está registrado');
    }

    const resetCode = this.generateResetCode();
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 10);

    await userRepository.updateUser(user.id, {
      resetPasswordToken: resetCode,
      resetPasswordExpires: expiration,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Código de recuperación',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f4f4f4; text-align: center;">
          <h2 style="color: #333;">Recuperación de contraseña</h2>
          <p style="color: #555;">Tu código de recuperación es:</p>
          <div style="font-size: 24px; font-weight: bold; background-color: #39A900; color:#fff; padding: 10px; border-radius: 5px; display: inline-block;">
            ${resetCode}
          </div>
          <p style="color: #666;">Este código es válido por <strong>10 minutos</strong>.</p>
          <p style="font-size: 14px; color: #999;">Si no solicitaste este código, ignora este mensaje.</p>
        </div>
      `,
    });
    return { message: 'Código enviado al correo' };
  }

  async resetPassword(email, resetCode, newPassword) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('El correo no está registrado');
    }

    if (user.resetPasswordToken !== resetCode || new Date() > user.resetPasswordExpires) {
      throw new Error('Código inválido o expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updateUser(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return { message: 'Contraseña actualizada correctamente' };
  }

  async register(userData) {
    const { email, password} = userData;

    const existingEmail = await userRepository.findUserByEmail(email);
    if (existingEmail) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    const token = this.generateToken(user);

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return { user: userWithoutPassword, token };
  }

  async login(email, password) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    const token = this.generateToken(user);

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return { user: userWithoutPassword, token };
  }

  async changePassword(userId, currentPassword, newPassword, confirmPassword) {
    const user = await userRepository.getUserByid(userId);
    if (!user) {
      throw new Error('Usuario no encontrado'); 
    }
  
    // Verificar que la contraseña actual sea correcta
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('La contraseña actual es incorrecta');
    }
  
    // Verificar que la nueva contraseña no sea igual a la actual
    if (currentPassword === newPassword) {
      throw new Error('La nueva contraseña no puede ser igual a la actual');
    }
  
    // Verificar que la confirmación coincida
    if (newPassword !== confirmPassword) {
      throw new Error('Las nuevas contraseñas no coinciden');
    }
  
    // Encriptar la nueva contraseña y actualizar en la base de datos
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateUser(userId, { password: hashedPassword });
  
    return { message: 'Contraseña actualizada correctamente' };
  }
  

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}

module.exports = new AuthService();