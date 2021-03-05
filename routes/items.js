var express = require('express');
var router = express.Router();
require('dotenv').config({ path: 'variables.env' });
require('../models/Item');
const mongoose = require('mongoose');
const itemController = require('../controllers/itemController');
const { catchErrors } = require('../handlers/errorHandlers');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

/* GET items listing. */

router.get('/', itemController.getItems);

router.post(
  '/duplicate',
  catchErrors(itemController.addItem),
  itemController.getItems
);

router.post(
  '/add',
  itemController.upload,
  catchErrors(itemController.resize),
  catchErrors(itemController.addItem),
  itemController.getItems
);
router.delete(
  '/delete',
  catchErrors(itemController.deleteItem),
  itemController.getItems
);

module.exports = router;
