const express = require("express");
const { create } = require("ipfs-http-client");
const Land = require("../models/Land");
const router = express.Router();

const ipfs = create({
  host: process.env.IPFS_HOST,
  port: process.env.IPFS_PORT,
  protocol: process.env.IPFS_PROTOCOL,
});

// Middleware to check role (simplified for demo)
const checkRole = (role) => (req, res, next) => {
  const userRole = "government"; // Replace with actual JWT decoding
  if (userRole !== role) return res.status(403).json({ error: "Forbidden" });
  next();
};

router.post("/submit", async (req, res) => {
  const { address, coordinates } = req.body;
  try {
    const land = new Land({
      ownerId: "mockUserId", // Replace with req.user.id from JWT
      address,
      coordinates,
    });
    await land.save();
    res.status(201).json({ message: "Land submitted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/pending", checkRole("government"), async (req, res) => {
  try {
    const lands = await Land.find({ status: "pending" });
    res.json(lands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/approve/:id", checkRole("government"), async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) return res.status(404).json({ error: "Land not found" });

    const data = { coordinates: land.coordinates, landId: land._id.toString() };
    const { cid } = await ipfs.add(JSON.stringify(data));
    land.ipfsCid = cid.toString();
    land.status = "approved";
    await land.save();

    res.json({ message: "Land approved", ipfsCid: cid.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;