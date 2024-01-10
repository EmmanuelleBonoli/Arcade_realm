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

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented
const edit = async (req, res, next) => {
  const { pseudo, email, password, image, admin, points } = req.body;
  const updatedUtilisateur = {
    id: req.params.id,
    pseudo,
    email,
    password,
    image,
    admin,
    points,
  };

  try {
    // const existingUtilisateur = await tables.utilisateur.read(req.params.id);
    // if (existingUtilisateur == null) {
    //   res.status(404).json(updatedUtilisateur);
    // } else {
    //   const result = await tables.utilisateur.update(updatedUtilisateur);
    //   res.status(200).json({ result });
    // }

// if (password !== null) {
//   console.log("Avant la mise à jour :", updatedUtilisateur);
//   const user = await tables.utilisateur.read(req.params.id);
//   updatedUtilisateur.password = user[0].password;
//   console.log("Après la mise à jour :", updatedUtilisateur);
// }

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

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
