const AbstractManager = require("./AbstractManager");

class LotManager extends AbstractManager {
  constructor() {
    super({ table: "lot" });
  }

  async create({
    name,
    image,
    description,
    utilisateurId,
    win,
    exchange,
    podium,
    mystery,
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, image, description, utilisateur_id, win, exchange, podium, mystery) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, image, description, utilisateurId, win, exchange, podium, mystery]
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

  async update({
    id,
    name,
    image,
    description,
    utilisateurId,
    win,
    exchange,
    podium,
    mystery,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, image = ?, description = ?,  utilisateur_id = ?, win= ?, exchange= ?, podium=?, mystery=? WHERE id = ?`,
      [
        name,
        image,
        description,
        utilisateurId,
        win,
        exchange,
        podium,
        mystery,
        id,
      ]
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

  async readByUserId(userId) {
    const [result] = await this.database.query(
      `select * from ${this.table} where utilisateur_id = ?`,
      [userId]
    );

    return result;
  }

  // a revoir
  async readByLotAvailable() {
    const [result] = await this.database.query(
      `select * from ${this.table} where win = 0`
    );

    return result;
  }

  async readByLotExchange() {
    const [result] = await this.database.query(
      `select * from ${this.table} where exchange = 1`
    );

    return result;
  }

  async readByLotMystery() {
    const [result] = await this.database.query(
      `select * from ${this.table} where mystery = 1`
    );

    return result;
  }

  insert(
    name,
    image,
    description,
    utilisateurId,
    win,
    exchange,
    podium,
    mystery
  ) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, image, description, utilisateur_id, win, exchange, podium, mystery) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, image, description, utilisateurId, win, exchange, podium, mystery]
    );
  }
}

module.exports = LotManager;
