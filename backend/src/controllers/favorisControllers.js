// Assurez-vous que votre route est correctement configurée pour gérer la création ou la mise à jour des favoris
// Vous devez extraire les informations de l'objet `req.body` comme vous l'avez fait dans votre code existant

const tables = require("../tables");

// exports.createOrUpdateFavorite = async (req, res) => {
//   try {
//     const { utilisateur_id, jeu_id, favori } = req.body;

//     // Vérifiez si l'enregistrement existe déjà dans la base de données
//     const existingFavorite = await tables.Favori.findOne({
//       where: { utilisateur_id, jeu_id },
//     });

//     if (existingFavorite) {
//       // Mise à jour de l'enregistrement existant
//       existingFavorite.favori = favori;
//       await existingFavorite.save();
//       res.status(200).json(existingFavorite);
//     } else {
//       // Création d'un nouvel enregistrement
//       const favoriEnregistre = await tables.Favori.create({
//         utilisateur_id,
//         jeu_id,
//         favori,
//       });

//       res.status(200).json(favoriEnregistre);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Échec de la requête POST" });
//   }
// };

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body

  const favoris = {
    jeuId: req.body.jeuId,
    utilisateurId: req.body.utilisateurId,
  };

  try {
    // Insert the item into the database
    const insertId = await tables.favoris.create(favoris);
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
  const { utilisateurId, jeuId } = req.params;

  try {
    const result = await tables.favoris.delete(utilisateurId, jeuId);
    res.status(201).send(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  add,
  destroy,
};
