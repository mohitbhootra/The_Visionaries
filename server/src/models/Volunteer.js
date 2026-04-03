const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tags: [String],
  isAvailable: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
