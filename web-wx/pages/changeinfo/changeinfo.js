// pages/changeinfo/changeinfo.js
import {
  changeInfo,
  getPatientInfo
} from '../../service/profile';

import Toast from '/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:{
      name: '',
      sex: '',
      age: '',
      height: '',
      weight: '',
      allergy: '',
      image: ''
    },
    image: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const patientInfo = wx.getStorageSync('patientInfo');
    const name = 'model.name';
    const sex = 'model.sex';
    const age = 'model.age';
    const height = 'model.height';
    const weight = 'model.weight';
    const allergy = 'model.allergy';
    const image = 'model.image';
    let imageArr = [];
    const show_image = 'image[0].url';
    const show_image_true = 'image[0].isImage';
    imageArr.push(patientInfo.image);
    this.setData({
      [name]:patientInfo.name,
      [sex]:patientInfo.sex,
      [age]:patientInfo.age,
      [height]:patientInfo.height,
      [weight]:patientInfo.weight,
      [allergy]:patientInfo.allergy,
      [image]:patientInfo.image,
      [show_image]:patientInfo.image,
      [show_image_true]: true
    })
  },
  checkName(event){
    const val = event.detail.value;
    if(val == '') {
      this.setData({
        error_name: '不能为空'
      })
    }else {
      const name = 'model.name';
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
      const sex = 'model.sex';
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
      const age = 'model.age';
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
      const height = 'model.height';
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
      const weight = 'model.weight';
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
      const allergy = 'model.allergy';
      this.setData({
        error_allergy: '',
        [allergy]: val
      })
    }    
  },
  // 删除照片
  delImage(){
    const m_image = 'model.image';
    // const image = 'image[0].url';
    this.setData({
      [m_image]: '',
      image: []
    })
  },
  //重新上传图片
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
        const image = 'model.image';
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
    })
  },
  //修改提交
  handleChange(){
    const info = this.data.model;
    if(info.name == '' || info.sex == '' || info.age == '' || info.height == '' || info.weight == '' || info.allergy == '' || info.image == '') {
      Toast('补充完整信息');
    }else {
      const patientInfo = wx.getStorageSync('patientInfo');
      const patient_id = patientInfo._id;
      changeInfo(patient_id,this.data.model).then(res=>{
        Toast('修改成功');
        getPatientInfo(patient_id).then(res=>{
          console.log(res);
          wx.setStorage({
            data: res.data,
            key: 'patientInfo',
          })
        })
        wx.switchTab({
          url: '/pages/profile/profile',
          success(){
            let page = getCurrentPages().pop();  
            if( page == undefined || page == null ) return;
            page.onLoad()
          }
        })
      })
    }
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