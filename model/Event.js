// backend/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
