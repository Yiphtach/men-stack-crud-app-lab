// Imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

// APP + Configurations
dotenv.config();
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

// Mongoose connection event listener
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev')); // Morgan middleware to log requests
app.use(helmet()); // Secure the app by setting various HTTP headers
app.use(compression()); // Gzip all responses for faster load time

// Static Files (CSS, Images, etc.)
app.use(express.static('public')); 

// Landing Page - Home page
app.get('/', (req, res) => {
  res.redirect('/teams'); // Redirects to the teams index page
});

// Teams Routes
const teamRoutes = require('./routes/teamRoutes');
app.use('/teams', teamRoutes);

// Error-handling middleware for generic server-side errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke! Our team is working on it.');
});

// Export the app for server.js
module.exports = app;
