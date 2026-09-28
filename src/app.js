import express from 'express';
import marketRoutes from './routes/market.routes.js';

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use(marketRoutes);

// Respuesta para rutas que no existen
app.use((req, res) => {
  res.status(404).json({
    message: 'Favor realizar pruebas en los siguientes endpoints:',
    endpoints: [
      'https://dps-guia11.onrender.com/usuarios',
      'https://dps-guia11.onrender.com/productos'
    ]
  });
});

export default app;
