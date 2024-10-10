const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { body, validationResult } = require('express-validator');

// Route to get all Knicks players (Index Page)
router.get('/', teamController.getAllPlayers);

// Route to get the form for adding a new player
router.get('/new', teamController.newPlayerForm);

// Route to create a new player (POST request)
router.post('/', 
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('points').isInt({ min: 0 }).withMessage('Points must be a non-negative integer'),
        body('assists').isInt({ min: 0 }).withMessage('Assists must be a non-negative integer'),
        body('rebounds').isInt({ min: 0 }).withMessage('Rebounds must be a non-negative integer'),
      ],
      teamController.createPlayer
    );

// Route to get a specific player by ID
router.get('/:id', teamController.getPlayerById);

// Route to get the form for editing a specific player
router.get('/:id/edit', teamController.editPlayerForm);

// Route to update a specific player (PUT request)
router.put('/:id', teamController.updatePlayer);

// Route to delete a specific player
router.delete('/:id', teamController.deletePlayer);

module.exports = router;
