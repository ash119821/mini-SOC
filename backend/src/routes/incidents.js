const express = require('express');
const Incident = require('../models/Incident');
const router = express.Router();

router.get('/', async (req, res) => {
  const docs = await Incident.find().sort({ createdAt: -1 }).limit(200).exec();
  res.json(docs);
});

router.patch('/:id', async (req, res) => {
  const { status, assignedTo } = req.body;
  const doc = await Incident.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'not found' });
  if (status) doc.status = status;
  if (assignedTo) doc.assignedTo = assignedTo;
  await doc.save();
  const io = req.app.get('io');
  if (io) io.emit('incident:updated', doc);
  res.json(doc);
});

module.exports = router;