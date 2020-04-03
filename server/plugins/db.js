module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.set('useCreateIndex', true)
  mongoose.connect('mongodb://127.0.0.1:27017/biyesheji', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("connect-ok");
  // 引用所有模型，防止报错
  require('require-all')(__dirname+'/../models')
}