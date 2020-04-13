// pages/login/login.js
import { loginUser } from '../../service/user'
import Toast from '/@vant/weapp/toast/toast';
Page({
  data: {
    login_info: {
      phone: '',
      password: ''
    },
    error_phone: '',
    error_password: ''
  },

  // ---------------------------- 检测合法性和赋值
  checkPhone(event){
    const val = event.detail.value;
    if(val.length != 11) {
      this.setData({
        error_phone: '请输入11位的手机号'
      })
    }else {
      const phone = 'login_info.phone'
      this.setData({
        error_phone: '',
        [phone]: val
      })
    }
  },
  checkPassword(event){
    const val = event.detail.value;
    if(val.length < 8 || val.length > 18) {
      this.setData({
        error_password: '请输入8-18位的密码'
      })
    }else {
      const password = 'login_info.password';
      this.setData({
        error_password: '',
        [password]: val
      })
    }
  },

  // -------------------------登录事件---------------
  handleLogin(){
    const model = this.data.login_info;
    if(model.phone.length == 11 && model.password.length >=8 && model.password.length <=18) {
      loginUser(model).then(result => {
        const res = result.data;
        console.log(res);
        wx.setStorage({
          data: res.patientInfo,
          key: 'patientInfo',
        })
        wx.setStorage({
          data: res.token,
          key: 'token',
        })
        Toast('登录成功，正在跳转...')
        wx.switchTab({
          url: '/pages/home/home',
        })
      })
    }else {
      Toast('请正确填写账号密码');
    }
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