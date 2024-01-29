// Import required dependencies
const jwt = require("jsonwebtoken");
const { app, request, tables } = require("../setup");

// Générez un token valide pour les tests
const generateValidToken = () => {
  const user = {
    id: 1,
    admin: 0,
  };

  return jwt.sign(user, process.env.APP_SECRET, { expiresIn: "1h" });
};

// Test suite for the GET /api/jeu route

describe("GET api/jeu && api/jeu/:id", () => {
  const idTestValide = 1;

  // Test de la route "read"
  it("should get a single game by ID", async () => {
    const response = await request(app).get(`/api/jeu/${idTestValide}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].id).toBe(idTestValide);
  });

  it("should return 404 for non-existent game", async () => {
    const response = await request(app).get(`/api/jeu/0`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  // Test de la route "readAll"
  it("should get all games", async () => {
    const response = await request(app).get(`/api/jeu`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
  });
});

// Test suite for the POST /api/jeu route

describe("POST /api/jeu", () => {
  it("should insert a game successfully", async () => {
    const token = generateValidToken();
    const dateTest = new Date("2024-01-29");
    const testGame = {
      name: "Sample game",
      image: "sample_image.jpg",
      regles: "Sample rules",
      actif: 1,
      physique: 1,
      date: dateTest.toISOString().split("T")[0],
      nbBorne: 3,
      description: "Sample description",
    };

    const response = await request(app)
      .post("/api/jeu/addjeu")
      .set("Authorization", `Bearer ${token}`)
      .send(testGame);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added game exists in the database
    const foundItem = await tables.jeu.read(response.body.insertId);

    expect(foundItem).toBeDefined();
    expect(foundItem[0].name).toBe(testGame.name);
  });
});

// Test suite for the PUT /api/jeu/:id route
describe("PUT /api/jeu/:id", () => {
  it("should update an existing game successfully", async () => {
    // Define a sample game for testing
    const token = generateValidToken();
    const dateTest = new Date("1990-10-01");
    const testGame = {
      name: "Pokemon",
      image: "/images/jeux/pokemon.jpg",
      regles: "rules",
      actif: 0,
      physique: 1,
      date: dateTest.toISOString().split("T")[0],
      nbBorne: 3,
      description: "Pokemon",
    };

    // Create a sample game in the database
    const [result] = await tables.jeu.insert(
      testGame.name,
      testGame.image,
      testGame.regles,
      testGame.actif,
      testGame.physique,
      testGame.date,
      testGame.nbBorne,
      testGame.description
    );

    // Define an updated game object
    const updatedGame = {
      id: result.insertId,
      name: "Pokemon",
      image: "/images/jeux/pokemon.jpg",
      regles: "rules",
      actif: 0,
      physique: 1,
      date: dateTest.toISOString().split("T")[0],
      nbborne: 10,
      description: "Pokemon",
    };

    // Send a PUT request to the /api/jeu/:id endpoint with updated data
    const response = await request(app)
      .put(`/api/jeu/${result.insertId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedGame);

    // Assertions
    expect(response.status).toBe(200);

    // Check if the game has been updated in the database
    const foundItem = await tables.jeu.read(result.insertId);

    // Assertions
    expect(foundItem).toBeDefined();
    expect(foundItem[0].name).toBe(updatedGame.name);
  });
});

// Test suite for the DELETE /api/jeu/:id route
describe("DELETE /api/jeu/:id", () => {
  it("should delete an existing game successfully", async () => {
    // Define a sample game for testing
    const token = generateValidToken();
    const dateTest = new Date("1990-10-01");
    const testGame = {
      name: "Pokemon",
      image: "/images/jeux/pokemon.jpg",
      regles: "rules",
      actif: 0,
      physique: 1,
      date: dateTest.toISOString().split("T")[0],
      nbBorne: 3,
      description: "Pokemon",
    };

    // Create a sample game in the database
    const [result] = await tables.jeu.insert(
      testGame.name,
      testGame.image,
      testGame.regles,
      testGame.actif,
      testGame.physique,
      testGame.date,
      testGame.nbBorne,
      testGame.description
    );

    // Send a DELETE request to the /api/jeu/:id endpoint
    const response = await request(app)
      .delete(`/api/jeu/${result.insertId}`)
      .set("Authorization", `Bearer ${token}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the game has been deleted from the database
    const foundItem = await tables.jeu.read(result.insertId);

    // Assertions
    expect(foundItem.length).toBe(0);
  });
});
