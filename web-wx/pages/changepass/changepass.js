// pages/changepass/changepass.js
import {
  changePass
} from '../../service/profile';

import Toast from '/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:'',
    error_password: ''
  },

  checkPassword(event){
    const val = event.detail.value;
    if(val.length < 8 || val.length > 18) {
      this.setData({
        error_password: '请输入8-18位的密码'
      })
    }else {
      const password = 'password';
      this.setData({
        error_password: '',
        password: val
      })
    }
  },
  handleChange(){
    const patientInfo = wx.getStorageSync('patientInfo');
    const patient_id = patientInfo._id;
    changePass(patient_id,this.data.password).then(res=>{
      console.log(res);
      Toast('修改成功，请重新登录');
      wx.clearStorageSync();
      wx.navigateTo({
        url: '/pages/login/login',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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