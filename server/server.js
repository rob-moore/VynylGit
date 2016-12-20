const config = require('../config');
const nodegit = require('../middleware/nodegit');
const express = require('express');

const app = module.exports = express();
app.locals.config = config;

app.use('/', express.static('static'));
app.get('/test', (req, res, next) => {
  res.send('hi from test');
  next();
});
app.use(nodegit());

app.listen(config.get('port'), config.get('ip'), () => {
  console.log(`Running on ${config.get('ip')}:${config.get('port')}`);
});
