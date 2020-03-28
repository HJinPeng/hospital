const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username:{type:String},
  password: {
    type:String,
    select: false,  // 表示查的时候不要查出来。密码不被查出来，
    set(val){
      return require('bcryptjs').hashSync(val,10);
    }
  }
})

module.exports = mongoose.model('AdminUser',schema,'adminusers');