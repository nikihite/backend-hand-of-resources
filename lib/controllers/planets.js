const { Router } = require('express');
const { Planet } = require('../models/Planet');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await Planet.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
