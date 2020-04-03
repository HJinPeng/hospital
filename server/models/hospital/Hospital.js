const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  hospital:{ type:String, unique: true },
  password: {
    type:String,
    select: false,  // 表示查的时候不要查出来。密码不被查出来，
    set(val){
      return require('bcryptjs').hashSync(val,10);
    }
  },
  picture:{type:String,required:true},
  intro:{type:String,required:true},
  area:[{type:String}],
  address:{type:String,required:true},
  phone:{type:String,required:true},
  good:{type:String,required:true},
  administrator:{type:String,required:true},
  email:{type:String,unique: true}
})

module.exports = mongoose.model('Hospital',schema,'hospitals');