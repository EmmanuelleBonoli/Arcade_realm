const AbstractManager = require("./AbstractManager");

class ScoreManager extends AbstractManager {
  constructor() {
    super({ table: "score" });
  }

  // The C of CRUD - Create operation

  async create({ utilisateur_id: utilisateurId, jeu_id: jeuId, points }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (utilisateur_id, jeu_id, points) values (?,?,?)`,
      [utilisateurId, jeuId, points]
    );
    return result;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async readAll() {
    const [result] = await this.database.query(`select * from ${this.table}`);
    return result;
  }

  // The U of CRUD - Update operation

  async update({ id, utilisateurid, jeuid, points }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET utilisateurid=?, jeuid=?, points=? WHERE id=?`,
      [utilisateurid, jeuid, points, id]
    );
    return result;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async readByUserId(userId) {
    const [result] = await this.database.query(
      `select ${this.table}.points, jeu.name, utilisateur.id from ${this.table} 
      JOIN utilisateur ON utilisateur.id = ${this.table}.utilisateur_id
      JOIN jeu ON jeu.id = ${this.table}.jeu_id
      WHERE utilisateur_id = ?`,
      [userId]
    );

    return result;
  }
}

module.exports = ScoreManager;
