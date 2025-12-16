const express = require('express');
const router = express.Router();
const auth = require('../mid/auth');
const User = require('../models/user');

router.get('/users', auth, async (req, res) => {
  try {
    if (req.user.tipo !== 'admin') return res.status(403).json({ msg: 'No autorizado: se reqiere admin' });
    const users = await User.find().select('-passwordHash');
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error servidor' });
  }
});

module.exports = router;