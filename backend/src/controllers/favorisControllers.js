// Assurez-vous que votre route est correctement configurée pour gérer la création ou la mise à jour des favoris
// Vous devez extraire les informations de l'objet `req.body` comme vous l'avez fait dans votre code existant

const tables = require("../tables");

exports.createOrUpdateFavorite = async (req, res) => {
  try {
    const { utilisateur_id, jeu_id, favori } = req.body;

    // Vérifiez si l'enregistrement existe déjà dans la base de données
    const existingFavorite = await tables.Favori.findOne({
      where: { utilisateur_id, jeu_id },
    });

    if (existingFavorite) {
      // Mise à jour de l'enregistrement existant
      existingFavorite.favori = favori;
      await existingFavorite.save();
      res.status(200).json(existingFavorite);
    } else {
      // Création d'un nouvel enregistrement
      const favoriEnregistre = await tables.Favori.create({
        utilisateur_id,
        jeu_id,
        favori,
      });

      res.status(200).json(favoriEnregistre);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Échec de la requête POST" });
  }
};
