const AbstractManager = require("./AbstractManager");

class LotManager extends AbstractManager {
  constructor() {
    super({ table: "lot" });
  }

  async create({ name, image, description, utilisateurid, disponible }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, image, description, utilisateur_id, disponible) values (?, ?, ?, ?, ?)`,
      [name, image, description, utilisateurid, disponible]
    );

    return result;
  }

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

  async update({ id, name, image, description, utilisateurid, disponible }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, image = ?, description = ?,  utilisateur_id = ?, disponible= ?, WHERE id = ?`,
      [name, image, description, utilisateurid, disponible, id]
    );

    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = LotManager;
