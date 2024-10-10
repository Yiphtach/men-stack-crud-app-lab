const Team = require('../models/team');

// GET all players (index)
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Team.find({});
    res.render('index', { players });
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET new player form
exports.newPlayerForm = (req, res) => {
  res.render('new');
};

// POST create a new player
exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = new Team(req.body);
    await newPlayer.save();
    res.redirect('/teams');
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET a single player by ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Team.findById(req.params.id);
    res.render('show', { player });
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET edit player form
exports.editPlayerForm = async (req, res) => {
  try {
    const player = await Team.findById(req.params.id);
    res.render('edit', { player });
  } catch (err) {
    res.status(500).send(err);
  }
};

// PUT update player data
exports.updatePlayer = async (req, res) => {
  try {
    await Team.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/teams/${req.params.id}`);
  } catch (err) {
    res.status(500).send(err);
  }
};

// DELETE a player by ID
exports.deletePlayer = async (req, res) => {
  try {
    await Team.findByIdAndRemove(req.params.id);
    res.redirect('/teams');
  } catch (err) {
    res.status(500).send(err);
  }
};
