const AbstractManager = require("./AbstractManager");

class EvenementManager extends AbstractManager {
  constructor() {
    super({ table: "evenement" });
  }

  // The C of CRUD - Create operation

  async create({ image }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (image) VALUES (?)`,
      [image]
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

  async update({ id, image }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET image=? WHERE id=?`,
      [image, id]
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

  insert(image) {
    return this.database.query(`INSERT INTO ${this.table} (image) VALUES (?)`, [
      image,
    ]);
  }
}

module.exports = EvenementManager;
