const mongoose = require('mongoose');

const LandSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    coordinates: Array,
    approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Land', LandSchema);
