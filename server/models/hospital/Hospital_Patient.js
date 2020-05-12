const mongoose = require('mongoose');
const Hospital_PatientSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  times: {
    type: Number
  }
})

const Hospital_PatientModel = mongoose.model('Hospital_Patient',Hospital_PatientSchema,'hospital_patients');

module.exports = Hospital_PatientModel