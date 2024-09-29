import { pool } from './db_config.js';

// Script SQL para crear la tabla de usuarios
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
  );
`;

// Función para ejecutar la migración
const migrate = async () => {
  try {
    const client = await pool.connect();
    await client.query(createUsersTable);
    console.log('Tabla de usuarios creada correctamente.');
    client.release();
  } catch (error) {
    console.error('Error al crear la tabla de usuarios:', error);
  } finally {
    await pool.end();
  }
};

// Ejecutar la función de migración
migrate();
