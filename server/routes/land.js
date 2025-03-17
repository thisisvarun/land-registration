const express = require("express");
const { create } = require("ipfs-http-client/cjs");
const jwt = require("jsonwebtoken");
const Land = require("../models/Land");
const router = express.Router();

const ipfs = create({
  host: process.env.IPFS_HOST,
  port: process.env.IPFS_PORT,
  protocol: process.env.IPFS_PROTOCOL,
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
  next();
};

router.post("/submit", authMiddleware, async (req, res) => {
  const { address, coordinates } = req.body;
  try {
    const land = new Land({
      ownerId: req.user.id,
      address,
      coordinates,
    });
    await land.save();
    res.status(201).json({ message: "Land submitted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/pending", authMiddleware, checkRole("government"), async (req, res) => {
  try {
    const lands = await Land.find({ status: "pending" });
    res.json(lands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/approve/:id", authMiddleware, checkRole("government"), async (req, res) => {
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