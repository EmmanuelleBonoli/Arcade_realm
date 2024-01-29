// Import required dependencies
const { database, tables } = require("../setup");

// Test suite for the insert method of JeuxManager
describe("Insert game", () => {
  it("should insert a game successfully", async () => {
    // Define a sample game for testing

    const dateTest = new Date("2024-01-29");
    const testGame = {
      name: "Sample game",
      image: "sample_image.jpg",
      regles: "Sample rules",
      actif: 1,
      physique: 1,
      date: dateTest,
      nbBorne: 3,
      description: "Sample description",
    };

    // Send an insert request to the jeu table with a test jeu
    const insertId = await tables.jeu.insert(
      testGame.name,
      testGame.image,
      testGame.regles,
      testGame.actif,
      testGame.physique,
      testGame.date,
      testGame.nbBorne,
      testGame.description
    );

    // Check if the newly added jeu exists in the database
    const [rows] = await database.query("SELECT * FROM jeu WHERE id = ?", [
      insertId[0].insertId,
    ]);

    const foundJeu = rows[0];

    // Assertions
    expect(foundJeu).toBeDefined();
    expect(foundJeu.name).toBe(testGame.name);
    expect(foundJeu.image).toBe(testGame.image);
    expect(foundJeu.regles).toBe(testGame.regles);
    expect(foundJeu.actif).toBe(testGame.actif);
    expect(foundJeu.physique).toBe(testGame.physique);
    expect(foundJeu.date).toStrictEqual(testGame.date);
    expect(foundJeu.nb_borne).toBe(testGame.nbBorne);
    expect(foundJeu.description).toBe(testGame.description);
  });

  it("should throw when passing invalid object", async () => {
    // Send an insert request to the jeu table with an incomplete object
    const promise = tables.jeu.insert({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});
