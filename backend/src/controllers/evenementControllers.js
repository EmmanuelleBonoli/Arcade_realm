// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const evenements = await tables.evenement.readAll();

    // Respond with the items in JSON format
    res.json(evenements);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const evenement = await tables.evenement.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (evenement == null) {
      res.sendStatus(404);
    } else {
      res.json(evenement);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the updated item data from the request body
  const updatedEvenementData = req.body;

  try {
    // Update the item in the database based on the provided ID
    const updatedEvenement = await tables.evenement.update(
      req.params.id,
      updatedEvenementData
    );

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the updated item in JSON format
    if (updatedEvenement == null) {
      res.sendStatus(404);
    } else {
      res.json(updatedEvenement);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const evenement = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.evenement.create(evenement);

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
    const deletedEvenement = await tables.evenement.delete(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the deleted item in JSON format
    if (deletedEvenement == null) {
      res.sendStatus(404);
    } else {
      res.json(deletedEvenement);
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
