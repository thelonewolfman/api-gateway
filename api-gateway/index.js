const express = require('express');
const passport = require('passport');

const router = express.Router();

const saleRoute = require('./sale');

// router.use('/sale', passport.authenticate('jwt', { session: false }));
router.use('/sale', saleRoute);

module.exports = router;
