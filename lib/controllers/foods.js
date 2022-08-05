const { Router } = require('express');
const { Food } = require('../models/Food');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await Food.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
