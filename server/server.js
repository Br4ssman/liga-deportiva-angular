require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

// MIDDLEWARES (ANTES DE RUTAS)
app.use(cors());
app.use(express.json());

// CONEXIÓN A MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error MongoDB:', err));

// RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// RUTA TEST
app.get('/', (req, res) => {
  res.send('API Liga Deportiva funcionando');
});

// HEALTH CHECK (Render)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// ARRANQUE
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});