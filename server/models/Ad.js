const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  isNow: Boolean,
  items: [{
    image:{type:String},
    url:{type:String}
  }]
});

module.exports = mongoose.model('Ad',schema,'ads');