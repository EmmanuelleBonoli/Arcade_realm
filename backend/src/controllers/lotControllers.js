// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const lots = await tables.lot.readAll();

    // Respond with the items in JSON format
    res.json(lots);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const lot = await tables.lot.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (lot == null) {
      res.sendStatus(404);
    } else {
      res.json(lot);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the updated item data from the request body
  const updatedLotData = req.body;

  try {
    // Update the item in the database based on the provided ID
    const updatedLot = await tables.lot.update(req.params.id, updatedLotData);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the updated item in JSON format
    if (updatedLot == null) {
      res.sendStatus(404);
    } else {
      res.json(updatedLot);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const lot = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.lot.create(lot);

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
    const deletedLot = await tables.lot.delete(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the deleted item in JSON format
    if (deletedLot == null) {
      res.sendStatus(404);
    } else {
      res.json(deletedLot);
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
