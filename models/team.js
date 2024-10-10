const mongoose = require('mongoose');

// Define the team schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  points: Number,
  assists: Number,
  rebounds: Number,
  team: { type: String, default: 'New York Knicks' },
});

// Export the model
module.exports = mongoose.model('Team', teamSchema);
