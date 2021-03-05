const mongoose = require('mongoose');
const User = mongoose.model('User');
const Validator = require('validator');
const isEmpty = require('is-empty');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.validateAccount = async (req, res, next) => {
  let errors = {};
  req.body.username = !isEmpty(req.body.username) ? req.body.username[0] : '';
  req.body.email = !isEmpty(req.body.email) ? req.body.email[0] : '';
  req.body.password = !isEmpty(req.body.password) ? req.body.password[0] : '';
  req.body.confirmPassword = !isEmpty(req.body.confirmPassword)
    ? req.body.confirmPassword[0]
    : '';

  if (Validator.isEmpty(req.body.username)) {
    errors.username = 'Username field is requried';
  }

  if (Validator.isEmpty(req.body.email)) {
    errors.email = 'Email field is requried';
  } else if (!Validator.isEmail(req.body.email)) {
    errors.email = 'Email must be valid';
  }

  if (Validator.isEmpty(req.body.password)) {
    errors.password = 'Password field is requried';
  }

  if (Validator.isEmpty(req.body.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password field is requried';
  }

  if (!Validator.equals(req.body.password, req.body.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  if (!isEmpty(errors)) {
    console.log(JSON.stringify(errors));
    return;
  }
  next();
};
exports.createAccount = async (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return;
    }
  });
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      user.save();
    });
  });

  next();
};

exports.login = (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', (e, user, info) => {
    console.log(e, user, info);
    if (e) return next(e);
    if (info) return res.send(info);
    req.logIn(user, (e) => {
      if (e) return next(e);
      return res.send(user);
    });
  })(req, res, next);
};
