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
router.get("/utilisateur/:id", utilisateurControllers.read);

// Route to add a new item
router.post("/evenement", evenementControllers.add);
router.post("/jeu", jeuxControllers.add);
router.post("/score", scoreControllers.add);
router.post("/lot", lotControllers.add);
router.post("/utilisateur", utilisateurControllers.add);

// Route to modify an item
// router.put("/evenement/:id", evenementControllers.update);
// router.put("/jeu/:id", jeuxControllers.update);
// router.put("/score/:id", scoreControllers.update);
// router.put("/lot/:id", lotControllers.update);
// router.put("/utilisateur/:id", utilisateurControllers.update);


// Route to delete an item
// router.delete("/evenement/:id", evenementControllers.delete);
// router.delete("/jeu/:id", jeuxControllers.delete);
// router.delete("/score/:id", scoreControllers.delete);
// router.delete("/lot/:id", lotControllers.delete);
// router.delete("/utilisateur/:id", utilisateurControllers.delete);

/* ************************************************************************* */

module.exports = router;
