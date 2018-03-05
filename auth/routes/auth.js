const express = require('express');
const passport = require('passport');

const auth = require('../handlers/auth');

const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(auth.signup, auth.getToken);

router.route('/signin')
  .post(passport.authenticate('local', { session: false }), auth.getToken);

router.route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/google/callback')
  .get(passport.authenticate('google', { session: false }), auth.getToken);

router.route('/') // for testing
  .get(requireAuth, (req, res) => res.json(req.user));

module.exports = router;
