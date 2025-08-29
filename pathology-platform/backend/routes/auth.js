const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOtp } = require('../utils/generateOtp');
const { sendOtp } = require('../utils/sendOtp');

const { check, validationResult } = require('express-validator');

const router = express.Router();

// Register new user
router.post(
  '/register',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('email')
      .optional({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email address'),
    check('phone')
      .optional({ checkFalsy: true })
      .isMobilePhone()
      .withMessage('Invalid phone number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, phone, role, password, medicalIdUrl } = req.body;
      if (role === 'doctor' && !medicalIdUrl) {
        return res.status(400).json({ error: 'Medical ID required for doctors' });
      }
      // Check existing user by email or phone
      const existing = await User.findOne({ $or: [{ email }, { phone }] });
      if (existing) {
        return res.status(400).json({ error: 'User already exists' });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        phone,
        role: role || 'patient',
        medicalIdUrl,
        passwordHash,
        verified: false,
      });
      // Generate and assign OTP
      const otp = generateOtp();
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000;
      await user.save();
      await sendOtp(email || phone, otp);
      res.status(201).json({ message: 'User registered. OTP sent for verification.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, phone, otp } = req.body;
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) return res.status(400).json({ error: 'User not found' });
    if (user.verified) return res.status(400).json({ error: 'User already verified' });
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    user.verified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    res.json({ message: 'User verified successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post(
  '/login',
  [
    check('password').notEmpty().withMessage('Password is required'),
    // At least one of email or phone must be provided
    check('email').custom((value, { req }) => {
      if (!value && !req.body.phone) {
        throw new Error('Email or phone is required');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, phone, password } = req.body;
      const user = await User.findOne({ $or: [{ email }, { phone }] });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
      if (!user.verified) return res.status(401).json({ error: 'Account not verified' });
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
