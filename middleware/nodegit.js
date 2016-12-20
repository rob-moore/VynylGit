const nodegit = require('nodegit');

module.exports = () => function nodegitMiddleware(req, res, next) {
  req.nodegit = nodegit;
  next();
};
