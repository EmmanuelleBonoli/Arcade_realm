const AbstractManager = require("./AbstractManager");

class JeuxManager extends AbstractManager {
  constructor() {
    super({ table: "jeu" });
  }

  // The C of CRUD - Create operation

  async create({
    name,
    image,
    regles,
    actif,
    physique,
    date,
    nbborne,
    description,
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, image, regles, actif, physique, date, nb_borne, description) values (?,?,?,?,?,?,?,?)`,
      [name, image, regles, actif, physique, date, nbborne, description]
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
    name,
    image,
    regles,
    actif,
    physique,
    date,
    nbborne,
    description,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name=?, image=?, regles=?, actif=?, physique=?, date=?, nb_borne=?, description=? WHERE id=?`,
      [name, image, regles, actif, physique, date, nbborne, description, id]
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

  async readOnline() {
    const [result] = await this.database.query(
      `select * from ${this.table} where actif = 1`
    );
    return result;
  }

  async readOnlineScores() {
    const [result] = await this.database.query(
      `select ${this.table}.id AS jeu_id, jeu.name AS jeu_name, utilisateur.pseudo AS utilisateur_pseudo, score.points AS score_pseudo from ${this.table} 
      LEFT JOIN score ON ${this.table}.id = score.jeu_id
      LEFT JOIN utilisateur ON utilisateur.id = score.utilisateur_id
      where ${this.table}.actif = 1
      ORDER BY jeu_id ASC, score_pseudo DESC
      `
    );
    return result;
  }

  insert(name, image, regles, actif, physique, date, nbBorne, description) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, image, regles,actif,physique,date,nb_borne,description) VALUES (?,?,?,?,?,?,?,?)`,
      [name, image, regles, actif, physique, date, nbBorne, description]
    );
  }
}

module.exports = JeuxManager;
