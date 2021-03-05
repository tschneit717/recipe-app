const mongoose = require('mongoose');
const validate = require('validator');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: 'You must provide a valid email',
    unique: true,
    validate: [validate.isEmail, 'Invalid email'],
  },
  username: {
    type: String,
    trim: true,
    required: 'You must provide a valid username',
  },
  password: {
    type: String,
    required: 'You must provide a valid password',
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
