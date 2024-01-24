const AbstractManager = require("./AbstractManager");

class FavorisManager extends AbstractManager {
  constructor() {
    super({ table: "favoris" });
  }

  // The C of CRUD - Create operation

  async create({ jeuId, utilisateurId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (jeu_id, utilisateur_id) VALUES (?, ?)`,
      [jeuId, utilisateurId]
    );
    return result;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }

  // You can add more methods as needed for your specific use case.
}

module.exports = FavorisManager;
