const mongoose = require('mongoose');
const moment = require("moment")
const PatientSchema = new mongoose.Schema({
  password: {
    type:String,
    select: false,  // 表示查的时候不要查出来。密码不被查出来，
    set(val){
      // console.log('val2',val);
      if(val.substr(0,1)=='$') {
        // console.log('true');
        return val;
      }else {
        // console.log('flase');
        return require('bcryptjs').hashSync(val,10);
      }
    }
  },
  image: String,
  name: String,
  sex: String,
  age: Number,
  phone: {
    type: String,
    unique: true
  },
  height: Number,
  weight: Number,
  allergy: String,
  temperature: {
    type: Number,
    default: 36.5
  },
  pressure: {
    type: String,
    default: '110/70'
  },
  heart: {
    type: String,
    default: 80
  },
  time: {
    type: String,
    default: () => moment(new Date()).format('YYYY-MM-DD')
  }
})

const PatientModel = mongoose.model('Patient',PatientSchema,'patients');

module.exports = PatientModel