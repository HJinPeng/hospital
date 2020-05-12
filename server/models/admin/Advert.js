const mongoose = require('mongoose');

const AdvertSchema = new mongoose.Schema({
  name: String,
  url: String,
  image: String,
  status: Boolean
})

const AdvertModel = mongoose.model('Advert',AdvertSchema,'adverts');

module.exports = AdvertModel