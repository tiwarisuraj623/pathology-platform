const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
    prescriptionUrl: { type: String },
    status: { type: String, enum: ['Pending', 'Sample Collected', 'Report Ready'], default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Referral', referralSchema);
