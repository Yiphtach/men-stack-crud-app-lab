const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// GET all players
router.get('/', teamController.getAllPlayers);

// GET form to add a new player
router.get('/new', teamController.newPlayerForm);

// POST create a new player
router.post('/', teamController.createPlayer);

// GET a single player by ID
router.get('/:id', teamController.getPlayerById);

// GET form to edit a player
router.get('/:id/edit', teamController.editPlayerForm);

// PUT update a player
router.put('/:id', teamController.updatePlayer);

// DELETE a player
router.delete('/:id', teamController.deletePlayer);

module.exports = router;
