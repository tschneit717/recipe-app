var express = require('express');
var router = express.Router();

require('dotenv').config({ path: 'variables.env' });
require('../models/User');

const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

router.get('/', (req, res) => {
  console.log(req);
});

router.post(
  '/register',
  userController.validateAccount,
  catchErrors(userController.createAccount),
  catchErrors(userController.login)
);

router.post('/login', userController.login);

module.exports = router;
