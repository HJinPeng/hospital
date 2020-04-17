const mongoose = require('mongoose');

const MedicSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  serial_number: {
    type: String,
    unique: true 
  },
  name: String,
  price: Number,
  number: Number,
  status: Boolean
})

const MedicModel = mongoose.model('Medic',MedicSchema,'medics');

module.exports = MedicModel