const AbstractManager = require("./AbstractManager");

class ScoreManager extends AbstractManager {
  constructor() {
    super({ table: "score" });
  }

  // The C of CRUD - Create operation

  async create({ utilisateurid, jeuid, points }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (utilisateur_id, jeu_id, points) values (?,?,?)`,
      [utilisateurid, jeuid, points]
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
}

module.exports = ScoreManager;
