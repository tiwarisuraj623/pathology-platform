const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const Test = require('../models/Test');

const router = express.Router();

// Get all active tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find({ active: true });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new test (admin only)
router.post(
  '/',
  auth,
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('price').isNumeric().withMessage('Price must be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
    try {
      const { name, description, price } = req.body;
      const test = new Test({ name, description, price });
      await test.save();
      res.status(201).json(test);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Update test (admin only)
router.put(
  '/:id',
  auth,
  [
    check('name').optional().notEmpty().withMessage('Name cannot be empty'),
    check('price').optional().isNumeric().withMessage('Price must be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
    try {
      const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(test);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
