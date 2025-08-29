const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    fileUrl: { type: String, required: true },
    resultDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
