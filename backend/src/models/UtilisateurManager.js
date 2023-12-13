const AbstractManager = require("./AbstractManager");

class UtilisateurManager extends AbstractManager {
  constructor() {
    super({ table: "utilisateur" });
  }

  // The C of CRUD - Create operation

  async create({ pseudo, email, password, image, admin, points }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, email, password, image, admin, points) values (?,?,?,?,?,?)`,
      [pseudo, email, password, image, admin, points]
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

  async update({ id, pseudo, email, password, image, admin, points }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET pseudo=?, email=?, password=?, image=?, admin=?, points=? WHERE id=?`,
      [pseudo, email, password, image, admin, points, id]
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

module.exports = UtilisateurManager;
