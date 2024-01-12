const express = require("express");

const router = express.Router();

// Middleware for upload images
const multer = require("multer");
const { v4 } = require("uuid");
const { hashPassword } = require("./services/auth");

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

// Route to get a list of items
router.get("/evenement", evenementControllers.browse);
router.get("/jeu", jeuxControllers.browse);
router.get("/score", scoreControllers.browse);
router.get("/lot", lotControllers.browse);
router.get("/utilisateur", utilisateurControllers.browse);
router.get("/lot/disponible", lotControllers.readByLotAvailable);
router.get("/lot/exchange", lotControllers.readByLotExchange);
router.get("/jeu/online", jeuxControllers.browseOnline);
router.get("/jeu/online/scores", jeuxControllers.browseOnlineScores);

// Route to get a specific item by ID
router.get("/evenement/:id", evenementControllers.read);
router.get("/jeu/:id", jeuxControllers.read);
router.get("/score/:id", scoreControllers.read);
router.get("/lot/:id", lotControllers.read);
router.get("/utilisateur/:id", utilisateurControllers.read);
router.get("/lot/win/:id", lotControllers.readByUserId);
router.get("/score/email/:id", scoreControllers.readByUserId);

// Route to add a new item
router.post("/evenement", evenementControllers.add);
router.post("/jeu", jeuxControllers.add);
router.post("/score", scoreControllers.add);

router.post("/lot", upload.single("image"), lotControllers.add);

// router.post("/utilisateur", utilisateurControllers.add);
router.post("/login", authControllers.login);
router.post("/signin", hashPassword, authControllers.signin);

// Route to modify an item
router.put("/evenement/:id", evenementControllers.edit);
router.put("/jeu/:id", jeuxControllers.edit);
router.put("/score/:id", scoreControllers.edit);
router.put("/lot/:id", lotControllers.edit);
router.put("/utilisateur/:id", utilisateurControllers.edit);

// Route to delete an item
router.delete("/evenement/:id", evenementControllers.destroy);
router.delete("/jeu/:id", jeuxControllers.destroy);
router.delete("/score/:id", scoreControllers.destroy);
router.delete("/lot/:id", lotControllers.destroy);
router.delete("/utilisateur/:id", utilisateurControllers.destroy);

/* ************************************************************************* */

module.exports = router;
