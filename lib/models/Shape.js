const pool = require('../utils/pool');

class Shape {
  id;
  name;
  sides;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.sides = row.sides;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * from shapes;
    `);
    return rows.map((row) => new Shape(row));
  }
}

module.exports = { Shape };
