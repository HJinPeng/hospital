const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: String,
  sex: String,
  age: Number,
  phone: String,
  image: String,
  department: String,
  good: String
})

const DoctorModel = mongoose.model('Doctor',DoctorSchema,'doctors');

module.exports = DoctorModel