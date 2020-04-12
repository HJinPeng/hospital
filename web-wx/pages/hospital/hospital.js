// pages/hospital/hospital.js
import {
  getHospitalInfo
} from '../../service/hospital'
Page({
  data: {
    hospital_id: '',
    picture: "",
    intro: "",
    doctor: [
      // {name:"黄医师",image:"/assets/home/yuyue.png"},
      // {name:"吴医师",image:"/assets/home/jilu.png"},
      // {name:"陈医师",image:"/assets/home/bingli.png"},
      // {name:"林医师",image:"/assets/home/shoucang.png"},
      // {name:"郑医师",image:"/assets/home/shoucang.png"},
    ],
    link: {
      address: "",
      phone: ""
    }
  },

  onLoad: function (options) {
    console.log(options);
    // -------------获取医院和医生信息
    const hospital_id = options._id
    this._getHospitalInfo(hospital_id);
  },

  // ------------------- 获取医院信息---------------
  _getHospitalInfo(hospital_id) {
    getHospitalInfo(hospital_id).then(res => {
      console.log(res);
      const {hospital, doctor} = res;
      const address = "link.address";
      const phone = "link.phone";
      this.setData({
        hospital_id: hospital._id,
        picture: hospital.picture,
        intro: hospital.intro,
        [address]: hospital.address,
        [phone]: hospital.phone,
        doctor: doctor
      })
    })
  },
})