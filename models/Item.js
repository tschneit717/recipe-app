const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    trim: true,
    required: 'You must provide a name for this item',
  },
  img: {
    type: String,
    required: 'You must provide a photo for this item',
  },
  tags: [String],
  // TODO: add author support
});

module.exports = mongoose.model('Item', itemSchema);
