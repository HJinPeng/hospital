// pages/order/order.js
import Toast from '/@vant/weapp/toast/toast';
import {
  getOrderInfo,
  toMakeOrder
} from '../../service/hospital'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrange_id: '',
    patient_id: '',
    type: '',
    lists: [
      // {label: '诊所', value: "珠浦第一骨科诊所"},
      // {label: '就诊医生', value: "万医生"},
      // {label: '就诊科室', value: "发烧科"},
      // {label: '就诊时间', value: "2020-01-01 16:20"},
      // {label: '地址', value: "广东省汕头市濠江区礐石街道珠浦上浦广东省汕头市濠江区礐石街道珠浦上浦"},
      // {label: '支付金额', value: "20元"},
      // {label: '支付时间', value: "2020-01-02 10:10"},
      // {label: '订单号', value: "20元"},
    ]
  },

  onLoad: function (options) {
    const {arrange_id,patient_id,type} = options;
    this.setData({
      arrange_id,
      patient_id,
      type
    })
    this._getOrderInfo(arrange_id,patient_id);
  },

 // -------------------- 获取订单信息--------------
  _getOrderInfo(arrange_id,patient_id) {

    getOrderInfo(arrange_id,patient_id).then(result => {
      const res = result.data;
      console.log(res);
      const data = res[0];
      let arr = [];
      let hospital = {
        label: '诊所',
        value: data.hospitalInfo[0].hospital
      };
      arr.push(hospital);
      let doctor = {
        label: '就诊医生',
        value: data.doctorInfo[0].name
      };
      arr.push(doctor);
      let depart = {
        label: '就诊科室',
        value: data.doctorInfo[0].department
      };
      arr.push(depart);
      let time = {
        label: '就诊时间',
        value: data.day+' '+data.start_time+'-'+data.end_time
      };
      arr.push(time);
      let address = {
        label: '诊所地址',
        value: data.hospitalInfo[0].address
      };
      arr.push(address);
      let money = {
        label: '支付金额',
        value: data.money+' 元'
      };
      arr.push(money);
      this.setData({
        lists: arr
      })
    })
 },

 // ------------------- 去支付 -------------------
  toPay() {
    toMakeOrder(this.data.arrange_id,this.data.patient_id).then(result => {
      Toast('支付成功！');
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/record/record',
        })
      },1000)
      
    })
 }
})