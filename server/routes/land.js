const express = require('express');
const Land = require('../models/Land');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { owner, coordinates } = req.body;
    const land = new Land({ owner, coordinates });
    await land.save();
    res.json({ message: 'Land submitted for approval' });
});

router.put('/approve/:id', async (req, res) => {
    await Land.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ message: 'Land approved' });
});

module.exports = router;
