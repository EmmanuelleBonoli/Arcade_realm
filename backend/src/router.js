const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const evenementControllers = require("./controllers/evenementControllers");
const jeuxControllers = require("./controllers/jeuxControllers");
const lotControllers = require("./controllers/lotControllers");
const scoreControllers = require("./controllers/scoreControllers");
const utilisateurControllers = require("./controllers/utilisateurControllers");

// Route to get a list of items
router.get("/evenement", evenementControllers.browse);
router.get("/jeu", jeuxControllers.browse);
router.get("/score", scoreControllers.browse);
router.get("/lot", lotControllers.browse);
router.get("/utilisateur", utilisateurControllers.browse);

// Route to get a specific item by ID
router.get("/evenement/:id", evenementControllers.read);
router.get("/jeu/:id", jeuxControllers.read);
router.get("/score/:id", scoreControllers.read);
router.get("/lot/:id", lotControllers.read);
router.get("/lot/email/:id", lotControllers.readByUserId);
router.get("/utilisateur/:id", utilisateurControllers.read);

// Route to add a new item
router.post("/evenement", evenementControllers.add);
router.post("/jeu", jeuxControllers.add);
router.post("/score", scoreControllers.add);
router.post("/lot", lotControllers.add);
router.post("/utilisateur", utilisateurControllers.add);
// router.post("/login", authController.login);

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
