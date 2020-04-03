const mongoose = require('mongoose');

const ArrangeSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  day: String,
  start_time: String,
  end_time: String,
  money: Number,
  number: Number
})

const ArrangeModel = mongoose.model('Arrange',ArrangeSchema,'arranges');

module.exports = ArrangeModel