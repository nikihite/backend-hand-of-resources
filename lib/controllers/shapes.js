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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Shape.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Shape.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
