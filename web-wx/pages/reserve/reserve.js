// pages/reserve/reserve.js
import {
  getDoctorAndArrange
} from '../../service/hospital'

import moment from 'moment'

Page({
  data: {
    info: {
      // image: "/assets/home/bingli.png",
      // name: "黄医师",
      // good: "擅长骨科，流感",
      // rate: 3,
      // number: 216
    },
    date: [
    ]
  },
  
  onLoad(options){
    console.log(options);
    const doctor_id = options._id;
    console.log(doctor_id);
    const day = moment(new Date()).format('YYYY-MM-DD');
    //console.log(day);
    // const day = '2020-03-10'
    this._getDoctorAndArrange(doctor_id,day);
  },

  // ------------------------ 获取医生信息和排班--------
  _getDoctorAndArrange(doctor_id,day){
    getDoctorAndArrange(doctor_id,day).then(result => {
      const res = result.data;
      console.log(res);
      const {doctor,arrange} = res;
      this.setData({
        info: doctor,
        date: arrange
      })
    })
  },
})