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
  const { image } = req.body;
  const updatedEvent = {
    id: req.params.id,
    image,
  };
  try {
    const existingEvent = await tables.evenement.read(req.params.id);
    if (existingEvent == null) {
      res.status(404).send("Lot not found");
    } else {
      const result = await tables.evenement.update(updatedEvent);
      res.status(200).json({ result });
    }
  } catch (err) {
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
    const result = await tables.evenement.delete(req.params.id);
    res.status(201).send(result);
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
