import jwt from 'jsonwebtoken';
import { pool } from '../config/db_config.js';

export const requireRole = (requiredRoles) => async (req, res, next) => {
  try {
    // Verifica si hay un token en la cabecera de autorización
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('No autorizado');

    const token = authHeader.split(' ')[1];

    // Verificar el token
    let payload;
    try {
      payload = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send('El token ha caducado');
      } else {
        return res.status(401).send('Token inválido');
      }
    }

    // Buscar el usuario en la base de datos
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [
      payload.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).send('Usuario no encontrado');

    const userRole = result.rows[0].role;

    // Verifica si el usuario tiene uno de los roles requeridos
    if (requiredRoles.includes(userRole)) {
      return next(); // El usuario tiene los permisos necesarios, continuar
    } else {
      return res.status(403).send('Permiso denegado');
    }
  } catch (error) {
    console.error('Error al verificar el perfil (requireRole):', error);
    res.status(500).send('Error interno del servidor');
  }
};
