const express = require('express');
const auth = require('../middleware/authMiddleware');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Create a new appointment (patient)
router.post('/', auth, async (req, res) => {
  try {
    const { tests, date, address, doctorId } = req.body;
    const appointment = new Appointment({
      patient: req.user._id,
      tests,
      date,
      address,
      doctor: doctorId,
      status: 'Scheduled',
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get appointments for current user
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      query.doctor = req.user._id;
    } else if (req.user.role === 'collector') {
      query.collector = req.user._id;
    }
    const appointments = await Appointment.find(query)
      .populate('tests')
      .populate('patient')
      .populate('doctor')
      .populate('collector');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update appointment status (collector or admin)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    if (req.user.role !== 'collector' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    appointment.status = req.body.status;
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
