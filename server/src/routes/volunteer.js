const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Volunteer = require('../models/Volunteer');
const verifyToken = require('../middleware/auth');
const { findMatch } = require('../utils/matchmaker');

// POST /api/volunteer/login
// Volunteer logs in with username + password
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const volunteer = await Volunteer.findOne({ username });
    if (!volunteer || volunteer.password !== password) {
      // NOTE: In production, use bcrypt for password comparison
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { volunteerId: volunteer._id, username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      username: volunteer.username,
      tags: volunteer.tags,
      isAvailable: volunteer.isAvailable
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/volunteer/seed
// Quick route to create a test volunteer (only use during prototype!)
router.post('/seed', async (req, res) => {
  try {
    const v = await Volunteer.create({
      username: 'testpeer1',
      password: 'password123',
      tags: ['Placements', 'Academics', 'Hostel Issues'],
      isAvailable: true
    });
    res.json({ success: true, created: v.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/volunteer/availability
// Volunteer toggles their online/offline status
router.patch('/availability', verifyToken, async (req, res) => {
  try {
    const { isAvailable } = req.body;
    const volunteerId = req.user.volunteerId;

    await Volunteer.findByIdAndUpdate(volunteerId, { isAvailable });
    res.json({ success: true, isAvailable });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/volunteer/match
// Student requests a peer match
router.post('/match', verifyToken, async (req, res) => {
  try {
    const { tags } = req.body;
    const result = await findMatch(tags || []);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;