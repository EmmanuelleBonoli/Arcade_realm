// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const utilisateurs = await tables.utilisateurs.readAll();

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

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the updated item data from the request body
  const updatedUtilisateurData = req.body;

  try {
    // Update the item in the database based on the provided ID
    const updatedUtilisateur = await tables.utilisateur.update(
      req.params.id,
      updatedUtilisateurData
    );

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the updated item in JSON format
    if (updatedUtilisateur == null) {
      res.sendStatus(404);
    } else {
      res.json(updatedUtilisateur);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
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

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the item from the database based on the provided ID
    const deletedUtilisateur = await tables.utilisateur.delete(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the deleted item in JSON format
    if (deletedUtilisateur == null) {
      res.sendStatus(404);
    } else {
      res.json(deletedUtilisateur);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
