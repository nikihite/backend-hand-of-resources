const { Router } = require('express');
const { Gta } = require('../models/Gta');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Gta.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Gta.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
