const mongoose = require('mongoose');

const Historyschema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  arrange_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  talk: String,
  now: String,
  physique: String,
  handle: String,
  examItem: String,
  examPrice: Number,
  medicItem: String,
  medicPrice: Number,
  allPrice: Number,
  day: String,
  time: String
})

const HistoryModel = mongoose.model('History',Historyschema,'historys');

module.exports = HistoryModel