const express = require("express");

const router = express.Router();

// Middleware for upload images
const multer = require("multer");
const { v4 } = require("uuid");
const { hashPassword, verifyToken } = require("./services/auth");

const options = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/");
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    const name = `${v4()}.${extension}`;
    req.body.url = name;
    cb(null, name);
  },
  limits: {
    fieldSize: 1024 * 5,
  },
});
const upload = multer({ storage: options });

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const evenementControllers = require("./controllers/evenementControllers");
const jeuxControllers = require("./controllers/jeuxControllers");
const lotControllers = require("./controllers/lotControllers");
const scoreControllers = require("./controllers/scoreControllers");
const utilisateurControllers = require("./controllers/utilisateurControllers");
const authControllers = require("./controllers/authControllers");
const favorisControllers = require("./controllers/favorisControllers");

// ALL
router.post("/login", authControllers.login);
router.post("/signin", hashPassword, authControllers.signin);

// Route to get a list of items
router.get("/evenement", evenementControllers.browse);
router.get("/jeu", jeuxControllers.browse);
router.get("/score", scoreControllers.browse);
router.get("/lot", lotControllers.browse);
router.get("/utilisateur", utilisateurControllers.browse);
router.get("/lot/disponible", lotControllers.readByLotAvailable);
router.get("/lot/exchange", lotControllers.readByLotExchange);
router.get("/lot/mystery", lotControllers.readByLotMystery);
router.get("/evenement/:id", evenementControllers.read);
router.post("/evenement", evenementControllers.add);
router.put("/evenement/:id", evenementControllers.edit);
router.delete("/evenement/:id", evenementControllers.destroy);
router.get("/jeu/online", jeuxControllers.browseOnline);
router.get("/utilisateur/podium", utilisateurControllers.getPodium);

//
router.get("/jeu", jeuxControllers.browse);
router.get("/jeu/:id", jeuxControllers.read);

// connected users
router.use(verifyToken);
router.post("/jeu", jeuxControllers.add);
router.put("/jeu/:id", jeuxControllers.edit);
router.delete("/jeu/:id", jeuxControllers.destroy);
router.get("/jeu/online/scores", jeuxControllers.browseOnlineScores);
router.get("/utilisateur/favoris/:id", utilisateurControllers.getFavorites);
router.get(
  "/utilisateur/favoris/game/:id",
  utilisateurControllers.getFavoritesGames
);
//
router.get("/score", scoreControllers.browse);
router.get("/score/:id", scoreControllers.read);
router.get("/score/email/:id", scoreControllers.readByUserId);
router.post("/score", scoreControllers.add);
router.post("/lot/mystery", lotControllers.addMystery);
router.put("/score/:id", scoreControllers.edit);
router.delete("/score/:id", scoreControllers.destroy);
//
router.get("/lot", lotControllers.browse);
router.get("/lot/disponible", lotControllers.readByLotAvailable);
router.get("/lot/exchange", lotControllers.readByLotExchange);
router.get("/lot/mystery", lotControllers.readByLotMystery);
router.get("/jeu/online", jeuxControllers.browseOnline);
router.get("/jeu/online/scores", jeuxControllers.browseOnlineScores);
router.get("/utilisateur/podium", utilisateurControllers.getPodium);
router.get("/utilisateur/topPlayers", utilisateurControllers.getTopPlayers);

// Route to get a specific item by ID
router.get("/evenement/:id", evenementControllers.read);
router.get("/jeu/:id", jeuxControllers.read);
router.get("/score/:id", scoreControllers.read);
router.get("/lot/:id", lotControllers.read);
router.get("/lot/win/:id", lotControllers.readByUserId);
router.get("/score/email/:id", scoreControllers.readByUserId);

// Route to add a new item
router.post("/evenement", evenementControllers.add);
router.post("/jeu", jeuxControllers.add);
router.post("/score", scoreControllers.add);
router.post("/lot/mystery", lotControllers.addMystery);
router.post("/lot", upload.single("image"), lotControllers.add);
router.post("/utilisateur", utilisateurControllers.add);
router.post("/login", authControllers.login);
router.post("/signin", hashPassword, authControllers.signin);

// Route to modify an item
router.put("/evenement/:id", evenementControllers.edit);
router.put("/jeu/:id", jeuxControllers.edit);
router.put("/score/:id", scoreControllers.edit);
router.put("/lot/:id", lotControllers.edit);
router.delete("/lot/:id", lotControllers.destroy);

// user
router.get("/utilisateur", utilisateurControllers.browse);
router.get("/utilisateur/topPlayers", utilisateurControllers.getTopPlayers);
router.get("/utilisateur/:id", utilisateurControllers.read);
router.put("/utilisateur/:id", utilisateurControllers.edit);
router.delete("/utilisateur/:id", utilisateurControllers.destroy);
router.delete("/favoris/:utilisateurId/:jeuId", favorisControllers.destroy);
router.post("/favoris", favorisControllers.add);

/* ************************************************************************* */
router.get("/userbytoken", utilisateurControllers.getByToken);

module.exports = router;
