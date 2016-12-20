'use strict';

const middleware = [
  require('./config'),
  require('./nodegit')
];

module.exports = middleware;