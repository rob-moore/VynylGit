'use strict';

const config = require('../config');

module.exports = () => function configMiddleware(req, res, next) {
  req.config = config;
  next();
};