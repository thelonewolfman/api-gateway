const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../../../config/env');

const User = require('mongoose').model('user');

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.JWT_SECRET
}

passport.use(new JwtStrategy(opts, (payload, done) => {
  User.findById(payload.sub)
    .then(user => {
      if (!user) return done(null, false);

      if (user) return done(null, user);
    })
    .catch(err => done(err, false));
}));
