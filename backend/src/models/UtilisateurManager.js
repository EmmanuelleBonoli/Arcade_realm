/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UtilisateurManager extends AbstractManager {
  constructor() {
    super({ table: "utilisateur" });
  }

  // The C of CRUD - Create operation

  async create({ pseudo, email, hashed_password, image, admin, points }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, email,  hashed_password, image, admin, points) values (?,?,?,?,?,?)`,
      [pseudo, email, hashed_password, image, admin, points]
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

  async update({ id, pseudo, email, image, admin, points, podium, tickets }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET pseudo=?, email=?, image=?, admin=?, points=?, podium=?, tickets=? WHERE id=?`,
      [pseudo, email, image, admin, points, podium, tickets, id]
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

  async getFavorites(id) {
    const [result] = await this.database.query(
      `SELECT utilisateur_id AS utilisateurId, jeu_id AS jeuId FROM favoris
      JOIN ${this.table} ON ${this.table}.id = favoris.utilisateur_id
      WHERE utilisateur_id = ?`,
      [id]
    );
    return result;
  }

  async getFavoritesGames(id) {
    const [result] = await this.database.query(
      `SELECT utilisateur_id AS utilisateurId, jeu_id AS jeuId, jeu.name FROM favoris
      JOIN ${this.table} ON ${this.table}.id = favoris.utilisateur_id
      JOIN jeu ON jeu.id = favoris.jeu_id
      WHERE utilisateur_id = ?`,
      [id]
    );
    return result;
  }

  async getPodium() {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE podium > 0 ORDER BY ${this.table}.podium ASC`
    );
    return result;
  }

  async getTopPlayers() {
    const [result] = await this.database.query(
      `SELECT ${this.table}.id, ${this.table}.pseudo, ${this.table}.email, ${this.table}.image, ${this.table}.admin, ${this.table}.points, ${this.table}.podium, ${this.table}.tickets, score.points AS meilleurScore FROM ${this.table} 
      JOIN score ON score.utilisateur_id = ${this.table}.id
      WHERE ${this.table}.admin = 0
      ORDER BY score.points DESC
      `
    );
    return result;
  }

  insert(image, userId) {
    return this.database.query(
      `UPDATE ${this.table} SET image = ? WHERE id = ?`,
      [image, userId]
    );
  }
}

module.exports = UtilisateurManager;
