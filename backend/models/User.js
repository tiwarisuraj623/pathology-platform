const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['patient', 'doctor', 'collector', 'admin'], default: 'patient' },
    verified: { type: Boolean, default: false },
    medicalIdUrl: { type: String },
    passwordHash: { type: String, required: true },
    otp: String,
    otpExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
