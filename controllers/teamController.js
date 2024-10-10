const Team = require('../models/team');

// GET all players (Index Page)
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Team.find({});
    res.status(200).render('index', { players });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving player data.');
  }
};

// GET form for creating a new player
exports.newPlayerForm = (req, res) => {
  res.status(200).render('new');
};

// POST create a new player
exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = new Team(req.body);
    await newPlayer.save();
    res.status(201).redirect('/teams'); // 201 for resource creation
  } catch (err) {
    console.error(err);
    res.status(400).send('Error creating new player. Please check the input.');
  }
};

// GET a single player by ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Team.findById(req.params.id);
    if (!player) {
      return res.status(404).send('Player not found');
    }
    res.status(200).render('show', { player });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving player details.');
  }
};

// GET form to edit a player
exports.editPlayerForm = async (req, res) => {
  try {
    const player = await Team.findById(req.params.id);
    if (!player) {
      return res.status(404).send('Player not found');
    }
    res.status(200).render('edit', { player });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving player data for editing.');
  }
};

// PUT update player data
exports.updatePlayer = async (req, res) => {
  try {
    const updatedPlayer = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlayer) {
      return res.status(404).send('Player not found');
    }
    res.status(200).redirect(`/teams/${updatedPlayer._id}`);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating player. Please check the input.');
  }
};

// DELETE a player by ID
exports.deletePlayer = async (req, res) => {
  try {
    const deletedPlayer = await Team.findByIdAndRemove(req.params.id);
    if (!deletedPlayer) {
      return res.status(404).send('Player not found');
    }
    res.status(200).redirect('/teams');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting player.');
  }
};
