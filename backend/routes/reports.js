const express = require('express');
const auth = require('../middleware/authMiddleware');
const Report = require('../models/Report');

const router = express.Router();

// List reports for current user
router.get('/', auth, async (req, res) => {
  try {
    let filterAppointments = {};
    if (req.user.role === 'patient') {
      filterAppointments.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      filterAppointments.doctor = req.user._id;
    } else if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const reports = await Report.find()
      .populate({
        path: 'appointment',
        populate: { path: 'patient doctor' },
      })
      .populate('test');
    // Filter by appointment relationships
    const result = reports.filter((r) => {
      if (!r.appointment) return false;
      if (req.user.role === 'admin') return true;
      if (req.user.role === 'patient') return r.appointment.patient._id.toString() === req.user._id.toString();
      if (req.user.role === 'doctor') return r.appointment.doctor && r.appointment.doctor._id.toString() === req.user._id.toString();
      return false;
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a report (admin or collector)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'collector') return res.status(403).json({ error: 'Unauthorized' });
    const { appointmentId, testId, fileUrl } = req.body;
    const report = new Report({ appointment: appointmentId, test: testId, fileUrl });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
