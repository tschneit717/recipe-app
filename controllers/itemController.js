const mongoose = require('mongoose');
const multer = require('multer');
const Item = mongoose.model('Item');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFiler(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That file type is not supported.' }, false);
    }
  },
};

exports.upload = multer(multerOptions).single('image');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize the file
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(200, jimp.AUTO);
  await photo.write(`./public/images/${req.body.photo}`);
  // Once we have written this photo to our file system, keep going
  next();
};

exports.getItems = async (req, res, next) => {
  const items = await Item.find();
  res.json(items);
};

exports.addItem = async (req, res, next) => {
  const savePromise = await new Item({
    itemName: req.body.name,
    img: req.body.photo,
  }).save();
  const itemsPromise = await Item.find();
  itemsPromise.push(savePromise);
  const [item, items] = await Promise.all([savePromise, itemsPromise]);
  return next();
};

exports.deleteItem = async (req, res, next) => {
  await Item.findOneAndDelete({ _id: `${req.query.id}` });
  return next();
};
