const mongoose = require('mongoose');

const config = require('../../config/env');

mongoose.connect(`${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`)
  .catch(err => { console.error(err.message); process.exit(1) });

require('../../app/models');

// Show all model
console.log(Object.keys(mongoose.models));
