const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const authRoute = require('./auth');

router.use('/auth', bodyParser.json(), authRoute);

module.exports = router;
