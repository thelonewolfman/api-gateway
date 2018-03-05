const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const randomize = require('randomatic');

const User = require('mongoose').model('user');

const PATTERN = '*';
const LENGTH = '10';

function generateRandomPassword() {
  return randomize(PATTERN, LENGTH);
}

//clientID = 486913437864-48mh5rljndnsvoeioa4qhnqu1669qlgv.apps.googleusercontent.com
//clientSecret = u7YVrobXgta25417-om6pV85
passport.use(new GoogleStrategy({
  clientID: '486913437864-48mh5rljndnsvoeioa4qhnqu1669qlgv.apps.googleusercontent.com',
  clientSecret: 'u7YVrobXgta25417-om6pV85',
  callbackURL: '/auth/google/callback' }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then(user => {
        if (user) return done(null, user);

        let password = generateRandomPassword()

        return new User({ googleId: profile.id, username: profile.id, password: password }).save();
      })
      .then(user => done(null, user))
      .catch(err => done(err));
}));
