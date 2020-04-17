const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: String,
  price: Number,
  status: Boolean
})

const ExamModel = mongoose.model('Exam',ExamSchema,'exams');

module.exports = ExamModel