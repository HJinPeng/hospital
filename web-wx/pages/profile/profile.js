// pages/profile/profile.js
Page({
  data: {
    patientInfo: {}
  },

  onLoad: function (options) {
    wx.getStorage({
      key: 'patientInfo',
      success: (res)=>{
        console.log(res.data);
        this.setData({
          patientInfo : res.data
        })
      }
    });

  },

  // 点击进入修改个人信息
  clickInfo(){
    wx.navigateTo({
      url: '/pages/changeinfo/changeinfo',
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