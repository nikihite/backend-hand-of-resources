const pool = require('../utils/pool');

class Food {
  id;
  name;
  color;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.type = row.type;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * from foods;
    `);
    return rows.map((row) => new Food(row));
  }
}

module.exports = { Food };
