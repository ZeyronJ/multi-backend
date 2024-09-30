import express from 'express';
import cors from 'cors';
import multer from 'multer';
// import tesseract from 'tesseract.js';
import routerAuth from './routes/auth.routes.js';
import routerUsers from './routes/users.routes.js';

// Inicializar express (Crear aplicación de express)
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// Configurar multer para guardar los archivos en la memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// app.use(multer({ dest: 'uploads/' }).single('archivo'));
// Rutas
app.use('/auth', routerAuth);
app.use('/users', routerUsers);
// Ruta para subir la imagen y procesarla con Tesseract.js
// app.post('/upload', upload.single('archivo'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No se subió ningún archivo.');
//     }

//     // Procesar la imagen usando Tesseract.js
//     const {
//       data: { text },
//     } = await tesseract.recognize(req.file.buffer, 'eng');

//     // Enviar el texto extraído como respuesta
//     res.json({ text });
//   } catch (error) {
//     console.error('Error procesando la imagen:', error);
//     res.status(500).send('Error procesando la imagen.');
//   }
// });

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Server corriendo en http://localhost:${process.env.PORT}/`);
}); // Inicia servidor
