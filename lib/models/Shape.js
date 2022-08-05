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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from shapes
      WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Shape(rows[0]);
  }

  static async insert({ name, sides }) {
    const { rows } = await pool.query(
      `
        INSERT INTO shapes (name, sides)
        VALUES ($1, $2)
        RETURNING *
      `,
      [name, sides]
    );
    return new Shape(rows[0]);
  }

}
module.exports = { Shape };
