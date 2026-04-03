const express = require('express');
const router = express.Router();
const ChatSession = require('../models/ChatSession');
const { scanForTriggers } = require('../utils/triggerScanner');

// POST /api/chat/message
router.post('/message', async (req, res) => {
  try {
    const { text, sessionId } = req.body;

    if (!text || !sessionId) {
      return res.status(400).json({ error: 'text and sessionId are required' });
    }

    const scanResult = scanForTriggers(text);

    const session = await ChatSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found or expired' });
    }

    session.messages.push({ sender: 'student', text });

    if (scanResult.riskLevel === 'emergency') {
      session.riskLevel = 'emergency';
    } else if (scanResult.riskLevel === 'flagged' && session.riskLevel !== 'emergency') {
      session.riskLevel = 'flagged';
    }

    await session.save();

    res.json({
      success: true,
      scanResult,
      ...(scanResult.riskLevel === 'emergency' && {
        emergencyContacts: [
          { name: 'Campus Counselor', phone: '1800-XXX-XXXX' },
          { name: 'Campus Security', phone: '1800-YYY-YYYY' },
          { name: 'iCall Helpline', phone: '9152987821' }
        ]
      })
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chat/history/:sessionId
router.get('/history/:sessionId', async (req, res) => {
  try {
    const session = await ChatSession.findById(req.params.sessionId);
    if (!session) return res.status(404).json({ error: 'Session expired or not found' });
    res.json({ alias: session.alias, messages: session.messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/emergency
router.get('/emergency', (req, res) => {
  res.json({
    contacts: [
      { name: 'Campus Counselor', phone: '1800-XXX-XXXX', available: '9am-5pm' },
      { name: 'Campus Security', phone: '1800-YYY-YYYY', available: '24/7' },
      { name: 'iCall Helpline', phone: '9152987821', available: '24/7' },
      { name: 'Vandrevala Foundation', phone: '1860-2662-345', available: '24/7' }
    ]
  });
});

module.exports = router;