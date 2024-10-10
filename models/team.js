const mongoose = require('mongoose');

// Define the team schema with data validation and defaults
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true,
  },
  position: {
    type: String,
    trim: true,
    default: 'Unknown',
  },
  points: {
    type: Number,
    default: 0,
    min: [0, 'Points cannot be negative'],
  },
  assists: {
    type: Number,
    default: 0,
    min: [0, 'Assists cannot be negative'],
  },
  rebounds: {
    type: Number,
    default: 0,
    min: [0, 'Rebounds cannot be negative'],
  },
  team: {
    type: String,
    default: 'New York Knicks',
    trim: true,
  }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Export the model
module.exports = mongoose.model('Team', teamSchema);
