// pages/home/home.js
import {
  getBanner,
  getArticles
} from '../../service/home'

Page({
  data: {
    banners: [],
    entry: [
      {name:"预约挂号",image:"/assets/home/yuyue.png",url:"/pages/serve/serve"},
      {name:"挂号记录",image:"/assets/home/jilu.png",url:"/pages/record/record"},
      {name:"我的病历",image:"/assets/home/bingli.png",url:"/pages/record/record"},
      // {name:"我的收藏",image:"/assets/home/shoucang.png"},
    ],
    articles: [
      {title:"武汉重症和危重病例实现清零，回顾、反思、感动",time:"4/25 18:21",image:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1379340635,2986232317&fm=11&gp=0.jpg",link:"https://www.baidu.com"},
      {title:"国务院：各级政府不得以任何名义截留、调用重点医疗应急防控物资物资物资物资",time:"4/20 18:21",image:"https://img1.gtimg.com/ninja/2/2020/02/ninja158054468035819.jpg",link:"https://www.baidu.com"},
      {title:"国务院：各级政府不得以任何名义截留、调用重点医疗应急防控物资",time:"2/2 18:21",image:"https://img1.gtimg.com/ninja/2/2020/02/ninja158054468035819.jpg",link:"https://www.baidu.com"}
    ]
  },
  onLoad: function (options) {
    // 1. 获取banner
    this._getBanner();
    // 2. 获取文章列表
    this._getArticles();
  },

  //---------------------网络请求相关方法----------
  _getBanner() {
    getBanner().then(res => {
      console.log(res);
      this.setData({
        banners: res.data
      })
    })
  },

  _getArticles(){
    getArticles().then(res=>{
      const data = res.data;
      data.forEach((item)=>{
        item.updatedAt = item.updatedAt.slice(0,10)+' '+item.updatedAt.slice(11,19)
      })
      console.log(res);
      this.setData({
        articles: res.data
      })
    })
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
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