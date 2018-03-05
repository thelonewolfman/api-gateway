const jwt = require('jsonwebtoken');

const config = require('../../config/env');

const User = require('mongoose').model('user');

function generateToken(user) {
  return jwt.sign({ sub: user._id }, config.JWT_SECRET, { expiresIn: 60 * 60 });
}

exports.signup = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username })
    .then(user => {
      if (user) { res.status(422).json({ message: 'username already exist' }) }

      return new User({ username: username, password: password }).save();
    })
    .then(user => { req.user = user; return next(); })
    .catch(err => next(err));
}

exports.getToken = (req, res, next) => {
  res.header('authorization', generateToken(req.user));
  res.json({ sucess: true });
}
