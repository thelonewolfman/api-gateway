const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('mongoose').model('user');

const opts = {
  username: 'username'
}

passport.use(new LocalStrategy(opts, (username, password, done) => {
  User.findOne({ username: username })
    .then(user => {
      if (!user) return done(null, false);

      return Promise.all([user.comparePassword(password), Promise.resolve(user)]);
    })
    .then(([isMatch, user]) => {
      if (!isMatch) return done(null, false);

      return done(null, user);
    })
    .catch(err => done(err, false));
}));
