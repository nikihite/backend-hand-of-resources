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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from foods
      WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Food(rows[0]);
  }

  static async insert({ name, color, type }) {
    const { rows } = await pool.query(
      `
        INSERT INTO foods (name, color, type)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, color, type]
    );
    return new Food(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const food = await Food.getById(id);
    if (!food) return null;
    const updatedData = { ...food, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE foods
      SET name = $2, color = $3, type = $4
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        updatedData.name,
        updatedData.color,
        updatedData.type,
      ]
    );
    return new Food(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from foods
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Food(rows[0]);
  }

}
module.exports = { Food };
