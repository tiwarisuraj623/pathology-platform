const express = require('express');
const auth = require('../middleware/authMiddleware');
const Referral = require('../models/Referral');

const router = express.Router();

// Create a referral (doctor)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'doctor') return res.status(403).json({ error: 'Only doctors can create referrals' });
    const { patientId, tests, prescriptionUrl } = req.body;
    const referral = new Referral({
      doctor: req.user._id,
      patient: patientId,
      tests,
      prescriptionUrl,
    });
    await referral.save();
    res.status(201).json(referral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get referrals for current user (doctor or patient)
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'doctor') {
      query.doctor = req.user._id;
    } else if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const referrals = await Referral.find(query)
      .populate('tests')
      .populate('patient')
      .populate('doctor');
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
