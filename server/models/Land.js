const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: String, required: true },
  coordinates: [{ lat: Number, lng: Number }],
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  ipfsCid: { type: String },
});

module.exports = mongoose.model("Land", landSchema);