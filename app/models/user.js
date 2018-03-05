const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  googleId: { type: String }
});

userSchema.path('googleId').validate(function(value, next) {
  if (!value) return next();

  mongoose.model('user').findOne({ googleId: value })
    .then(user => {
      if (user.googleId) return next(false, 'Already exist');

      return next();
    })
    .catch(err => next(err));
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.hash(user.password, SALT_ROUNDS)
    .then(hash => { user.password = hash; next(); })
    .catch(err => next(err));
});

userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;

  return bcrypt.compare(candidatePassword, user.password);
}

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });
userSchema.set('timestamps', true);

module.exports = mongoose.model('user', userSchema);
