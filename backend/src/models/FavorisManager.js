const AbstractManager = require("./AbstractManager");

class FavorisManager extends AbstractManager {
  constructor() {
    super({ table: "favoris" });
  }

  // The C of CRUD - Create operation

  async create({ userId, itemId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, item_id) VALUES (?, ?)`,
      [userId, itemId]
    );
    return result;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
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
