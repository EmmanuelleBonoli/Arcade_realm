/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UtilisateurManager extends AbstractManager {
  constructor() {
    super({ table: "utilisateur" });
  }

  // The C of CRUD - Create operation

  async create({
    pseudo,
    email,
    hashed_password,
    image,
    admin,
    points,
    podium,
    tickets,
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, email,  hashed_password, image, admin, points, podium, tickets) values (?,?,?,?,?,?,?,?)`,
      [pseudo, email, hashed_password, image, admin, points, podium, tickets]
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

  async update({
    id,
    pseudo,
    email,
    hashed_password,
    image,
    admin,
    points,
    podium,
    tickets,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET pseudo=?, email=?, hashed_password=?, image=?, admin=?, points=?, podium=?, tickets=? WHERE id=?`,
      [
        pseudo,
        email,
        hashed_password,
        image,
        admin,
        points,
        podium,
        tickets,
        id,
      ]
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

  async getByPseudo(pseudo) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE pseudo = ?`,
      [pseudo]
    );
    return result;
  }
}

module.exports = UtilisateurManager;
