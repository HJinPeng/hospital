// pages/serve/serve.js
import {
  getHospital,
  getDoctors
} from '../../service/serve'
Page({
  data: {
    value: "",
    hotHospital: [
      // {name: "珠浦第一骨科诊所珠浦第一骨科诊所珠浦第一骨科诊所珠浦第一骨科诊所",tag:['骨科','发热'],score:3,image:"http://img2.imgtn.bdimg.com/it/u=2270827361,2609739487&fm=26&gp=0.jpg"},
      // {name: "珠浦第一骨科诊所",tag:['骨科'],image:"http://img2.imgtn.bdimg.com/it/u=2270827361,2609739487&fm=26&gp=0.jpg"},
      // {name: "珠浦第一骨科诊所",tag:['骨科','发热'],score:3,image:"http://img2.imgtn.bdimg.com/it/u=2270827361,2609739487&fm=26&gp=0.jpg"},
    ],
    quick: [
      {name:'发烧',symptom:"症状：发热是指腋下温度达到或超过37.2℃，发热的症状常常与原发疾病有关",tip:"注意：卧床休息,多饮水,吃清淡饮食,保持皮肤的清洁,干燥",image:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2624953485,235029434&fm=26&gp=0.jpg"},
      {name:'发烧',symptom:"症状：发热是指腋下温度达到或超过37.2℃，发热的症状常常与原发疾病有关",tip:"注意：卧床休息,多饮水,吃清淡饮食,保持皮肤的清洁,干燥",image:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2624953485,235029434&fm=26&gp=0.jpg"},
      {name:'发烧',symptom:"症状：发热是指腋下温度达到或超过37.2℃，发热的症状常常与原发疾病有关",tip:"注意：卧床休息,多饮水,吃清淡饮食,保持皮肤的清洁,干燥",image:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2624953485,235029434&fm=26&gp=0.jpg"},
      {name:'发烧',symptom:"症状：发热是指腋下温度达到或超过37.2℃，发热的症状常常与原发疾病有关",tip:"注意：卧床休息,多饮水,吃清淡饮食,保持皮肤的清洁,干燥",image:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2624953485,235029434&fm=26&gp=0.jpg"},
    ],
    doctor: []
  },
  // -------------------------- 钩子函数-------------
  onLoad(){
    // 获取所有医院信息
    this._getHospital();
    // 获取所有医生
    this._getDoctors();
  },
  

  // ---------------------------- 方法--------------------
  // 获取所有医院信息
  _getHospital(){
    getHospital().then(result => {
      const res  = result.data;
      let array = [];
      const hospital = res;
      const length = hospital.length;
      for(let i = 0 ; i < length ; i++) {
        let o  = {};
        o._id = hospital[i]._id;
        o.address = hospital[i].address;
        o.administrator = hospital[i].administrator;
        o.email = hospital[i].email;
        o.good = hospital[i].good.split('/');
        o.hospital =  hospital[i].hospital;
        o.intro = hospital[i].intro;
        o.phone = hospital[i].phone;
        o.picture = hospital[i].picture;
        array.push(o);
      }
      this.setData({
        hotHospital: array
      })
    })
  },

  // -----------------------获取所有医生--------------
  _getDoctors(){
    getDoctors().then(res=>{
      console.log('doctorlist',res);
      this.setData({
        doctor:res.data
      })
    })
  },

  // ------------------------- 事件监听--------------------
  onChange(){

  },
  onSearch(){

  },
  onClick(){

  }
})