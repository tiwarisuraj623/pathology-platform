const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Get current user
router.get('/me', auth, (req, res) => {
  res.json({ user: req.user });
});

// Update current user profile
router.put(
  '/me',
  auth,
  [
    check('name').optional().notEmpty().withMessage('Name cannot be empty'),
    check('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, phone } = req.body;
      if (name) req.user.name = name;
      if (phone) req.user.phone = phone;
      await req.user.save();
      res.json({ message: 'Profile updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// List all users (admin only)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  const users = await User.find();
  res.json(users);
});

module.exports = router;
