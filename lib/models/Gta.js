const pool = require('../utils/pool');

class Gta {
  id;
  first_name;
  last_name;
  occupation;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.occupation = row.occupation;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * from gtas;
    `);
    return rows.map((row) => new Gta(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT * FROM gtas
        WHERE id = $1
        `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Gta(rows[0]);
  }
}

module.exports = { Gta };
