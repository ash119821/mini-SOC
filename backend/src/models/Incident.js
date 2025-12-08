const mongoose = require('mongoose');
const IncidentSchema = new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Open','In Progress','Resolved'], default: 'Open' },
  severity: { type: String, enum: ['low','medium','high'], default: 'medium' },
  logIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
  sourceIPs: [String],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number, default: 0 }
});
IncidentSchema.index({ createdAt: -1 });
module.exports = mongoose.model('Incident', IncidentSchema);