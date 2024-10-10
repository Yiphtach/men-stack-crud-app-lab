const Team = require('../models/team');
const NodeCache = require('node-cache');
const cache = new NodeCache();

// GET all players (Index Page)
exports.getAllPlayers = async (req, res) => {
  const cachedPlayers = cache.get('players');
  if (cachedPlayers) {
    return res.status(200).render('index', { players: cachedPlayers });
  }

  try {
    const players = await Team.find({});
    cache.set('players', players, 600); // Cache for 10 minutes
    res.status(200).render('index', { players });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving player data');
  }
};

// GET form for creating a new player
exports.newPlayerForm = (req, res) => {
  res.status(200).render('new');
};

// POST create a new player
exports.createPlayer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('new', { errors: errors.array() });
  }

  try {
    const newPlayer = new Team(req.body);
    await newPlayer.save();
    res.status(201).redirect('/teams?message=Player created successfully');
  } catch (err) {
    res.status(400).redirect('/teams/new?error=Error creating player');
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

exports.searchPlayers = async (req, res) => {
  const { name, position } = req.query;

  try {
    const query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (position) query.position = new RegExp(position, 'i');

    const players = await Team.find(query);
    res.status(200).render('index', { players });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error searching players');
  }
};

