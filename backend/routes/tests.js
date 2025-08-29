const express = require('express');
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
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
  try {
    const { name, description, price } = req.body;
    const test = new Test({ name, description, price });
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update test (admin only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
