const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2d';

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, tipo } = req.body;
    if (!username || !password) return res.status(400).json({ msg: 'Faltan campos obligatorios' });

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ msg: 'Usuario ya existe' });

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ username, email, passwordHash, tipo });
    await user.save();

    res.status(201).json({ ok: true, user: { id: user._id, username: user.username, tipo: user.tipo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: 'Faltan credenciales' });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign({ userId: user._id, tipo: user.tipo }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, tipo: user.tipo, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// Get current user (GET /api/auth/me) -> protected
const authMiddleware = require('../mid/auth');
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

module.exports = router;