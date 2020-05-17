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
      let arr = [];
      const day = moment(new Date()).format('YYYY-MM-DD');
      const time = moment(new Date()).format('HH:mm');
      for(let i = 0 ; i < arrange.length; i++) {
        if(arrange[i].day==day&&arrange[i].end_time>time||arrange[i].day>day) {
          arr.push(arrange[i]);
        }
      }
      this.setData({
        info: doctor,
        date: arr
      })
    })
  },
})