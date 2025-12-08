const express = require('express');
const Log = require('../models/Log');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    const doc = await Log.create(payload);
    // emit via socket
    const io = req.app.get('io');
    if (io) io.emit('log:new', doc);
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const docs = await Log.find().sort({ timestamp: -1 }).limit(200).exec();
  res.json(docs);
});

module.exports = router;