// pages/register/register.js
import {
  registerUser
} from '../../service/user'

import Toast from '/@vant/weapp/toast/toast';
Page({
  data: {
    register_info:{
      phone: '',
      password: '',
      name: '',
      sex: '',
      age: '',
      height: '',
      weight: '',
      allergy: '',
      image: ''
    },
    image:[],
    error_phone: '',
    error_password: '',
    error_sex: '',
    error_age: '',
    error_height:'',
    error_weight: '',
    error_allergy: ''
  },
  // ------------------------- 检测合法性并赋值，因为vant的field没有双向绑定------------
  checkPhone(event){
    const val = event.detail.value;
    console.log(this.data.register_info.phone);
    if(val.length != 11) {
      this.setData({
        error_phone: '请输入11位的手机号'
      })
    }else {
      const phone = 'register_info.phone'
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
      const password = 'register_info.password';
      this.setData({
        error_password: '',
        [password]: val
      })
    }
  },
  checkName(event){
    const val = event.detail.value;
    if(val == '') {
      this.setData({
        error_name: '不能为空'
      })
    }else {
      const name = 'register_info.name';
      this.setData({
        error_name: '',
        [name]: val
      })
    }
  },
  checkSex(event){
    const val = event.detail.value;
    if(val != '男' && val != '女') {
      this.setData({
        error_sex: '只能输入 男/女'
      })
    }else {
      const sex = 'register_info.sex';
      this.setData({
        error_sex: '',
        [sex]: val
      })
    }
  },
  checkAge(event){
    const val = event.detail.value;
    if(val == '') {
      this.setData({
        error_sex: '不能为空'
      })
    }else {
      const age = 'register_info.age';
      this.setData({
        error_age: '',
        [age]: val
      })
    }    
  },
  checkHeight(event){
    const val = event.detail.value;
    if(val == '') {
      this.setData({
        error_height: '不能为空'
      })
    }else {
      const height = 'register_info.height';
      this.setData({
        error_height: '',
        [height]: val
      })
    }    
  },
  checkWeight(event){
    const val = event.detail.value;
    if(val == '') {
      this.setData({
        error_weight: '不能为空'
      })
    }else {
      const weight = 'register_info.weight';
      this.setData({
        error_weight: '',
        [weight]: val
      })
    }    
  },
  checkAllergy(event){
    const val = event.detail.value;
    if(val == '') {
      this.setData({
        error_allergy: '不能为空'
      })
    }else {
      const allergy = 'register_info.allergy';
      this.setData({
        error_allergy: '',
        [allergy]: val
      })
    }    
  },

  // ----------------------- 注册用户-----------------
  handleRegister() {
    const model = this.data.register_info;
    console.log(model);
    if(model.phone.length == 11 && model.password.length >=8 && model.password.length <=18
      && model.name != '' && (model.sex == '男'|| model.sex == '女')
      && model.age != '' && model.height != '' && model.weight != '' && model.allergy != '') {
      registerUser(model).then(result => {
        Toast('注册成功，返回登录');
        wx.navigateTo({
          url: '/pages/login/login',
        })
      })
    }else {
      Toast('补充完整信息再提交');
    }
  },

  // ------------------------ 上传头像----------------
  afterUpload(event){
    const { file } = event.detail;
    const that = this;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://localhost:3000/wx/api/upload', 
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        console.log(JSON.parse(res.data));
        const data = JSON.parse(res.data);
        const image = 'register_info.image';
        const show_image = 'image[0].url';
        const show_image_true = 'image[0].isImage'
        that.setData({
          [image] : data.url,
          [show_image]: data.url,
          [show_image_true]: true
        })
        // 上传完成需要更新 fileList
        // const { fileList = [] } = this.data;
        // fileList.push({ ...file, url: res.data });
        // this.setData({ fileList });
      }
    });
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