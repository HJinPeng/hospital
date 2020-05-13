const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  tab: String,
  image: String,
  status: Boolean,
  body: String
},{
  timestamps: true
})

const ArticleModel = mongoose.model('Article',ArticleSchema,'articles');

module.exports = ArticleModel