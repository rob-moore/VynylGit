const config = require('../config');
const nodegit = require('../middleware/nodegit');
const express = require('express');
const cors = require('cors');
const fetch = require('isomorphic-fetch');

const app = module.exports = express();
app.locals.config = config;
app.use(cors());

app.use('/', express.static('static'));

app.use(nodegit());

app.listen(config.get('port'), config.get('ip'), () => {
  console.log(`Running on ${config.get('ip')}:${config.get('port')}`);
});
