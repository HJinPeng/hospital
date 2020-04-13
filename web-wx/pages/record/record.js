// pages/record/record.js
import {
  getOrderList
} from '../../service/record'

Page({
  data: {
    wait:[
      // {name: "珠浦第一骨科诊所",content: "订单号：EF1546513",time:"就诊时间：2020-02-02 10:10"},
      // {name: "珠浦第一骨科诊所",content: "订单号：EF1546513",time:"就诊时间：2020-02-02 10:10"},
      // {name: "珠浦第一骨科诊所",content: "订单号：EF1546513",time:"就诊时间：2020-02-02 10:10"}
    ],
    finish:[
      // {name: "珠浦第一骨科诊所",content: "订单号：EF1546513",time:"就诊时间：2020-02-02 10:10"},
      // {name: "珠浦第一骨科诊所",content: "订单号：EF1546513",time:"就诊时间：2020-02-02 10:10"},
      // {name: "珠浦第一骨科诊所",content: "订单号：EF1546513",time:"就诊时间：2020-02-02 10:10"}
    ],
    past:[
      // {name: "珠浦第一骨科诊所",content: "订单号：EF1546513",time:"就诊时间：2020-02-02 10:10"},
      // {name: "珠浦第一骨科诊所",content: "订单号：EF1546513",time:"就诊时间：2020-02-02 10:10"},
      // {name: "珠浦第一骨科诊所",content: "订单号：EF1546513",time:"就诊时间：2020-02-02 10:10"}
    ],
    history:[
      {name: "珠浦第一骨科诊所",content: "症状：发烧、感冒",time:"2020-02-02"},
      {name: "珠浦第一骨科诊所",content: "症状：发烧、感冒",time:"2020-02-02"},
      {name: "珠浦第一骨科诊所",content: "症状：发烧、感冒",time:"2020-02-02"}
    ]
  },

  onLoad: function (options) {
    // -- 加载订单列表--
    this._getOrderList();
  },

  //--------------- 加载订单列表-------------
  _getOrderList() {
    const patientInfo = wx.getStorageSync('patientInfo');
    const patient_id = patientInfo._id;
    getOrderList(patient_id).then(result => {
      const res = result.data;
      console.log(res);
      let wait = [];
      let finish = [];
      let past = [];
      const wait_arr = res.wait;
      const w_length = wait_arr.length;
      const past_arr = res.past;
      const p_length = past_arr.length;
      const finish_arr = res.finish;
      const f_length = finish_arr.length;
      for(let i = 0 ; i < w_length; i++) {
        let o = {}; 
        o.color = '#f00';
        o.hospital_id = wait_arr[i].hospitalInfo[0]._id;
        o.name = wait_arr[i].hospitalInfo[0].hospital;
        o.order_id = wait_arr[i]._id;
        o.content = '订单号：'+ o.order_id;
        o.arrange_id = wait_arr[i].arrange_id;
        o.time = '预约时间：' + wait_arr[i].arrangeInfo[0].day + ' ' +  wait_arr[i].arrangeInfo[0].start_time + '-' + wait_arr[i].arrangeInfo[0].end_time;
        wait.push(o);
      }
      for(let i = 0 ; i < f_length; i++) {
        let o = {}; 
        o.color = '#1296db';
        o.hospital_id = finish_arr[i].hospitalInfo[0]._id;
        o.name = finish_arr[i].hospitalInfo[0].hospital;
        o.order_id = finish_arr[i]._id;
        o.content = '订单号：'+ o.order_id;
        o.arrange_id = finish_arr[i].arrange_id;
        o.time = '就诊时间：' + finish_arr[i].arrangeInfo[0].day + ' ' +  finish_arr[i].arrangeInfo[0].start_time + '-' + finish_arr[i].arrangeInfo[0].end_time;
        finish.push(o);
      }
      for(let i = 0 ; i < p_length; i++) {
        let o = {}; 
        o.color = '#666';
        o.hospital_id = past_arr[i].hospitalInfo[0]._id;
        o.name = past_arr[i].hospitalInfo[0].hospital;
        o.order_id = past_arr[i]._id;
        o.content = '订单号：'+ o.order_id;
        o.arrange_id = past_arr[i].arrange_id;
        o.time = '已过期：' + past_arr[i].arrangeInfo[0].day + ' ' +  past_arr[i].arrangeInfo[0].start_time + '-' + past_arr[i].arrangeInfo[0].end_time;
        past.push(o);
      }
      
      this.setData({
        wait,
        finish,
        past
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})