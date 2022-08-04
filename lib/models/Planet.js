const pool = require('../utils/pool');

class Planet {
  id;
  name;
  color;
  sun;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.sun = row.sun;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * from planets;
    `);
    return rows.map((row) => new Planet(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from planets
      WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Planet(rows[0]);
  }

}
module.exports = { Planet };
