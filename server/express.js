const express = require('express');
const morgan = require('morgan');

const middlewares = require('./middlewares');

module.exports = () => {
  const app = express();

  app.use(morgan('dev'));

  app.use(middlewares);

  app.use((err, req, res, next) => {
    res.json({ message: err.message });
  });

  return app;
}
