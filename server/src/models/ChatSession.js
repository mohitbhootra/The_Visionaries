const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true
  },
  messages: [
    {
      sender: String,
      text: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  tags: [String],
  riskLevel: {
    type: String,
    enum: ['safe', 'flagged', 'emergency'],
    default: 'safe'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400        // ← 24 hours in seconds, MongoDB deletes automatically
  }
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);