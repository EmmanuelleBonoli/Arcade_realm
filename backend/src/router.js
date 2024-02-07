const express = require("express");

const router = express.Router();
// const { v4 } = require("uuid");

const { hashPassword, verifyToken } = require("./services/auth");
const uploadAvatar = require("./middlewares/uploadAvatar");
const uploadEvent = require("./middlewares/uploadEvent");
const uploadGame = require("./middlewares/uploadGame");
const uploadLot = require("./middlewares/uploadLot");

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
router.get("/jeu/online/scores", jeuxControllers.browseOnlineScores);

//
router.get("/jeu", jeuxControllers.browse);
router.get("/jeu/:id", jeuxControllers.read);
router.get("/utilisateur/podium", utilisateurControllers.getPodium);
// connected users
// router.use(verifyToken);
router.put("/jeu/:id", verifyToken, jeuxControllers.edit);
router.delete("/jeu/:id", verifyToken, jeuxControllers.destroy);
router.get(
  "/jeu/online/scores",
  verifyToken,
  jeuxControllers.browseOnlineScores
);
router.get(
  "/utilisateur/favoris/:id",
  verifyToken,
  utilisateurControllers.getFavorites
);
router.get(
  "/utilisateur/favoris/game/:id",
  verifyToken,
  utilisateurControllers.getFavoritesGames
);
//
router.get("/score", verifyToken, scoreControllers.browse);
router.get("/score/:id", verifyToken, scoreControllers.read);
router.get("/score/email/:id", verifyToken, scoreControllers.readByUserId);
router.post("/score", verifyToken, scoreControllers.add);
router.post("/lot/mystery", verifyToken, lotControllers.addMystery);
router.put("/score/:id", verifyToken, scoreControllers.edit);
router.delete("/score/:id", verifyToken, scoreControllers.destroy);
//
router.get("/lot", verifyToken, lotControllers.browse);
router.get("/lot/disponible", verifyToken, lotControllers.readByLotAvailable);
router.get("/lot/exchange", verifyToken, lotControllers.readByLotExchange);
router.get("/lot/mystery", verifyToken, lotControllers.readByLotMystery);
router.get("/jeu/online", verifyToken, jeuxControllers.browseOnline);
router.get(
  "/jeu/online/scores",
  verifyToken,
  jeuxControllers.browseOnlineScores
);
router.get(
  "/utilisateur/podium",
  verifyToken,
  utilisateurControllers.getPodium
);
router.get(
  "/utilisateur/topPlayers",
  verifyToken,
  utilisateurControllers.getTopPlayers
);

// Route to get a specific item by ID
router.get("/evenement/:id", verifyToken, evenementControllers.read);
router.get("/jeu/:id", verifyToken, jeuxControllers.read);
router.get("/score/:id", verifyToken, scoreControllers.read);
router.get("/lot/:id", verifyToken, lotControllers.read);
router.get("/lot/win/:id", verifyToken, lotControllers.readByUserId);
router.get("/score/email/:id", verifyToken, scoreControllers.readByUserId);

// Route to add a new item
router.post("/evenement", verifyToken, evenementControllers.add);
router.post("/score", verifyToken, scoreControllers.add);
router.post("/lot/mystery", verifyToken, lotControllers.addMystery);
router.post("/lot", verifyToken, uploadLot.single("image"), lotControllers.add);

router.post(
  "/utilisateur/image",
  verifyToken,
  uploadAvatar.single("image"),
  utilisateurControllers.getUploadImage
);
router.post(
  "/evenement/addevent",
  verifyToken,
  uploadEvent.single("image"),
  evenementControllers.getUploadImage
);
router.post(
  "/lot/addlot",
  verifyToken,
  uploadLot.single("image"),
  lotControllers.getUploadImage
);

router.post(
  "/jeu/addjeu",
  verifyToken,
  uploadGame.single("image"),
  jeuxControllers.getUploadImage
);

router.post("/utilisateur", verifyToken, utilisateurControllers.add);
router.post("/login", verifyToken, authControllers.login);
router.post("/signin", verifyToken, hashPassword, authControllers.signin);

// Route to modify an item
router.put("/evenement/:id", verifyToken, evenementControllers.edit);
router.put("/jeu/:id", verifyToken, jeuxControllers.edit);
router.put("/score/:id", verifyToken, scoreControllers.edit);
router.put("/lot/:id", verifyToken, lotControllers.edit);
router.delete("/lot/:id", verifyToken, lotControllers.destroy);

// user
router.get("/utilisateur", verifyToken, utilisateurControllers.browse);
router.get(
  "/utilisateur/topPlayers",
  verifyToken,
  utilisateurControllers.getTopPlayers
);
router.get("/utilisateur/:id", verifyToken, utilisateurControllers.read);
router.put("/utilisateur/:id", verifyToken, utilisateurControllers.edit);
router.delete("/utilisateur/:id", verifyToken, utilisateurControllers.destroy);
router.delete(
  "/favoris/:utilisateurId/:jeuId",
  verifyToken,
  favorisControllers.destroy
);
router.post("/favoris", verifyToken, favorisControllers.add);
/* ************************************************************************* */
router.get("/userbytoken", verifyToken, utilisateurControllers.getByToken);

module.exports = router;
