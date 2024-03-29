/* eslint-disable camelcase */
// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const utilisateurs = await tables.utilisateur.readAll();

    // Respond with the items in JSON format
    res.json(utilisateurs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const utilisateur = await tables.utilisateur.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (utilisateur == null) {
      res.sendStatus(404);
    } else {
      res.json(utilisateur);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const utilisateur = await tables.utilisateur.getFavorites(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (utilisateur == null) {
      res.sendStatus(404);
    } else {
      res.json(utilisateur);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getFavoritesGames = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const utilisateur = await tables.utilisateur.getFavoritesGames(
      req.params.id
    );

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (utilisateur == null) {
      res.sendStatus(404);
    } else {
      res.json(utilisateur);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  const { pseudo, email, image, admin, points, podium, tickets } = req.body;

  const updatedUtilisateur = {
    id: req.params.id,
    pseudo,
    email,
    image,
    admin,
    points,
    podium,
    tickets,
  };

  try {
    const result = await tables.utilisateur.update(updatedUtilisateur);
    if (result.affectedRows > 0) {
      res.status(200).json(updatedUtilisateur);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const utilisateur = req.body;

  try {
    // Insert the item into the database

    const insertId = await tables.utilisateur.create(utilisateur);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy = async (req, res, next) => {
  // Extract the item data from the request body
  try {
    // Insert the item into the database
    const result = await tables.utilisateur.delete(req.params.id);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).send(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getPodium = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const utilisateurs = await tables.utilisateur.getPodium();
    // Respond with the items in JSON format
    res.json(utilisateurs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const getTopPlayers = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const utilisateurs = await tables.utilisateur.getTopPlayers();

    const tempTopPlayers = [];

    utilisateurs.forEach((element) => {
      const existingUser = tempTopPlayers.find(
        (user) => user.id === element.id
      );

      if (!existingUser && tempTopPlayers.length < 6) {
        tempTopPlayers.push(element);
      }
    });
    res.json(tempTopPlayers);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getUploadImage = async (req, res, next) => {
  try {
    const [result] = await tables.utilisateur.insert(
      `images/Avatar/${req.body.url}`,
      req.auth.sub
    );
    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const getByToken = async (req, res) => {
  const userInfo = req.auth;

  try {
    if (userInfo && userInfo.sub) {
      const utilisateur = await tables.utilisateur.read(userInfo.sub);

      if (utilisateur == null) {
        res.sendStatus(404);
      } else {
        res.json(utilisateur);
      }
    } else {
      res.status(404).send("User not found. Auth doesn't exist");
    }
  } catch (e) {
    res.status(500).send(`Internal server error : ${e}`);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getFavorites,
  getPodium,
  getTopPlayers,
  getByToken,
  getUploadImage,
  getFavoritesGames,
};
