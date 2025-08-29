const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    collector: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
    date: { type: Date, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ['Scheduled', 'Collected', 'In Lab', 'Processing', 'Report Ready', 'Cancelled'],
      default: 'Scheduled',
    },
    price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
