// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const jeux = await tables.jeu.readAll();

    // Respond with the items in JSON format
    res.json(jeux);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const jeu = await tables.jeu.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (jeu == null) {
      res.sendStatus(404);
    } else {
      res.json(jeu);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const { name, image, regles, actif, physique, date, nbborne, description } = req.body;
  const updatedJeu = {
    id: req.params.id,
    name, 
    image, 
    regles, 
    actif, 
    physique, 
    date, 
    nbborne, 
    description
  };
  try {
    const existingJeu = await tables.jeu.read(req.params.id);
    if (existingJeu == null) {
      res.status(404).send("Jeu not found");
    } else {
      const result = await tables.jeu.update(updatedJeu);
      res.status(200).json({ result });
    }
  } catch (err) {
    next(err);
  }
};



// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const jeu = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.jeu.create(jeu);

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
    const result = await tables.jeu.delete(req.params.id);
    res.status(201).send(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
 destroy,
};
