import { pool } from '../config/db_config.js';

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users'); // Sin cambios aquí
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]); // Sin cambios aquí
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // Cambié las variables aquí
    if (!name || !email || !password || !role)
      return res.status(400).send('Faltan datos obligatorios');
    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)', // Cambié 'usuarios' a 'users' y las variables
      [name, email, password, role]
    );
    res.status(200).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al crear el usuario (correo repetido?)' });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, role } = req.body; // Cambié las variables aquí
    if (!name || !email || !password || !role)
      return res.status(400).send('Faltan datos obligatorios');
    await pool.query(
      'UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5', // Cambié 'usuarios' a 'users' y las variables
      [name, email, password, role, id]
    );
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar el usuario (correo repetido?)' });
  }
};

export const deleteUserById = async (req, res) => {
  // No se verifica si el usuario existe antes de eliminar
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM users WHERE id = $1', [id]); // Sin cambios aquí
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};
