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

  static async insert({ name, color, sun }) {
    const { rows } = await pool.query(
      `
        INSERT INTO planets (name, color, sun)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, color, sun]
    );
    return new Planet(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const planet = await Planet.getById(id);
    if (!planet) return null;
    const updatedData = { ...planet, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE planets
      SET name = $2, color = $3, sun = $4
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        updatedData.name,
        updatedData.color,
        updatedData.sun,
      ]
    );
    return new Planet(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from planets
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Planet(rows[0]);
  }
}
module.exports = { Planet };
