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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Food.getById(req.params.id);
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
      const data = await Food.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }    
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Food.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Food.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
