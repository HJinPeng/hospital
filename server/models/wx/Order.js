const mongoose = require('mongoose');
const moment = require("moment")
const OrderSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  arrange_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  status: {
    type: Number,
    default: 0
  },
  time: {
    type: String,
    default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }
})

const OrderModel = mongoose.model('Order',OrderSchema,'orders');

module.exports = OrderModel