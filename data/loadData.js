require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

const Item = require('../models/Item');

const items = JSON.parse(fs.readFileSync(__dirname + '/items.json', 'utf8'));

async function deleteData() {
  console.log('Removing items...');
  await Item.remove();
  console.log('Done!');
  process.exit();
}

async function loadData() {
  try {
    console.log('Adding items...');
    await Item.insertMany(items);
    console.log('Done!');
    process.exit();
  } catch (err) {
    console.log('You broke something!');
    console.log(err);
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
