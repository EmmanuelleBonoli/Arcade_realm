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

  async delete(utilisateurId, jeuId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE utilisateur_id = ? AND jeu_id = ?`,
      [utilisateurId, jeuId]
    );
    return result;
  }

  // You can add more methods as needed for your specific use case.
}

module.exports = FavorisManager;
