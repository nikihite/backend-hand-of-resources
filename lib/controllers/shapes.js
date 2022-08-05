const { Router } = require('express');
const { Shape } = require('../models/Shape');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await Shape.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
