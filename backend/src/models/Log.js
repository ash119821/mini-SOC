const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  sourceIP: String,
  target: String,
  attackType: String,
  message: String,
  severity: { type: String, enum: ['low','medium','high'], default: 'low' },
  processed: { type: Boolean, default: false },
  incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', default: null }
});
LogSchema.index({ timestamp: -1 });
LogSchema.index({ sourceIP: 1 });
module.exports = mongoose.model('Log', LogSchema);
