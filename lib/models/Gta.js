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

  static async insert({ first_name, last_name, occupation }) {
    const { rows } = await pool.query(
      `
        INSERT INTO gtas (first_name, last_name, occupation)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [first_name, last_name, occupation]
    );
    return new Gta(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const gta = await Gta.getById(id);
    if (!gta) return null;
    const updatedData = { ...gta, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE gtas
      SET first_name = $2, last_name = $3, occupation = $4
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        updatedData.first_name,
        updatedData.last_name,
        updatedData.occupation,
      ]
    );
    return new Gta(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from gtas
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Gta(rows[0]);
  }
}

module.exports = { Gta };
