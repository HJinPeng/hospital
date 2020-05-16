// pages/reserve/childCpns/h-info/h-info.js
import {
  getHospitalInfo
} from '../../../../service/hospital'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },
  observers:{
    info(val){
      console.log(val);
      console.log(val.hospital_id);
      if(val.hospital_id) {
        this._getHospitalInfo(val.hospital_id);
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    hospitalInfo:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getHospitalInfo(hospital_id){
      getHospitalInfo(hospital_id).then(res=>{
        console.log(res.data);
        this.setData({
          hospitalInfo: res.data.hospital
        })
      })
    }
  }
})
