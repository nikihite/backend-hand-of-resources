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
}

module.exports = { Planet };
