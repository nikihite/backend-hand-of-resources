const pool = require('../utils/pool');

class City {
  id;
  city;
  country;
  population;

  constructor(row) {
    this.id = row.id;
    this.city = row.city;
    this.country = row.country;
    this.population = row.population;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * from cities;
    `);
    return rows.map((row) => new City(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from cities
      WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new City(rows[0]);
  }

  static async insert({ city, country, population }) {
    const { rows } = await pool.query(
      `
        INSERT INTO cities (city, country, population)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [city, country, population]
    );
    return new City(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const city = await City.getById(id);
    if (!city) return null;
    const updatedData = { ...city, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE cities
      SET city = $2, country = $3, population = $4
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        updatedData.city,
        updatedData.country,
        updatedData.population,
      ]
    );
    return new City(rows[0]);
  }

}
module.exports = { City };
