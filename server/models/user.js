const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: false },
  passwordHash: { type: String, required: true },
  tipo:     { type: String, enum: ['admin','normal','capitan','arbitro'], default: 'normal' },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);