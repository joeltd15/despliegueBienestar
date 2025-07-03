const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleware = (requiredRole = null) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]

      if (!token) {
        return res.status(401).json({ message: "Token requerido" })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded

      // Validar roles si es necesario
      if (requiredRole && decoded.roleId !== requiredRole) {
        return res.status(403).json({ message: "Permiso denegado" })
      }

      next()
    } catch (error) {
      console.error("JWT Error:", error.message)
      return res.status(401).json({ message: "Token inválido o expirado" })
    }
  }
}

module.exports = authMiddleware
