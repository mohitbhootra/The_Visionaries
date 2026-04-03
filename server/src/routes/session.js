const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const generateAlias = require('../utils/aliasGenerator');
const ChatSession = require('../models/ChatSession');

// POST /api/session/start
router.post('/start', async (req, res) => {
  try {
    const alias = generateAlias();

    const session = await ChatSession.create({
      alias,
      tags: req.body.tags || []
    });

    const token = jwt.sign(
      { sessionId: session._id, alias },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      alias,
      token,
      sessionId: session._id,
      message: 'Session started. Your data will auto-delete in 24 hours.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/session/status/:sessionId
router.get('/status/:sessionId', async (req, res) => {
  try {
    const session = await ChatSession.findById(req.params.sessionId);
    if (!session) {
      return res.json({ exists: false, message: 'Session has been auto-deleted.' });
    }
    const expiresAt = new Date(session.createdAt.getTime() + 24 * 60 * 60 * 1000);
    const remainingMs = expiresAt - Date.now();
    res.json({ exists: true, alias: session.alias, expiresInMs: remainingMs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;