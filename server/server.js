'use strict';

const config = require('../config');
const middlewares = require('../middleware');
const http = require('http');

const app = module.exports = require('express')();

app.use(middlewares);
