const config = require('../config');
const nodegit = require('../middleware/nodegit');
const express = require('express');
const fetch = require('isomorphic-fetch');

const app = module.exports = express();
app.locals.config = config;

app.use('/', express.static('static'));

app.use('/test', (req, res, next) => {
  fetch('//offline-news-api.herokuapp.com/stories')
      .then(response => {
        if (response.status >= 400) {
          // TODO: Do I need to pass this error to next()?
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(stories => {
        res.send(stories);
        return next();
      })
      .catch(next);
});


app.use(nodegit());

app.listen(config.get('port'), config.get('ip'), () => {
  console.log(`Running on ${config.get('ip')}:${config.get('port')}`);
});
