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
  const { name, image, description, utilisateurId, disponible } = req.body;
  const updatedLot = {
    id: req.params.id,
    name,
    image,
    description,
    utilisateurId,
    disponible,
  };
  try {
    const existingLot = await tables.lot.read(req.params.id);
    if (existingLot == null) {
      res.status(404).send("Lot not found");
    } else {
      const result = await tables.lot.update(updatedLot);
      res.status(200).json({ result });
    }
  } catch (err) {
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
  // Extract the item data from the request body
  try {
    const result = await tables.lot.delete(req.params.id);
    res.status(201).send(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readByUserId = async (req, res, next) => {
  try {
    const result = await tables.lot.readByUserId(req.params.id);
    if (result.length > 0) {
      res.status(201).send(result);
    } else {
      res.sendStatus(404);
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
  readByUserId,
};
