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
      `UPDATE ${this.table} SET name=?, image=?, regles=?, actif=?, physique=?, date=?, nb_borne=?, description=?, WHERE id=?`,
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
}

module.exports = JeuxManager;
