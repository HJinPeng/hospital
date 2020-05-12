// pages/home/home.js
import {
  getBanner
} from '../../service/home'

Page({
  data: {
    banners: [
      {title:"夏天流行病",image:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3604584978,874367284&fm=11&gp=0.jpg",link:"https://www.baidu.com"},
      {title:"如何戴口罩",image:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3604584978,874367284&fm=11&gp=0.jpg",link:"https://www.baidu.com"},
      {title:"感冒怎么办",image:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3604584978,874367284&fm=11&gp=0.jpg",link:"https://www.baidu.com"},
    ],
    entry: [
      {name:"预约挂号",image:"/assets/home/yuyue.png",url:"/pages/serve/serve"},
      {name:"挂号记录",image:"/assets/home/jilu.png",url:"/pages/record/record"},
      {name:"我的病历",image:"/assets/home/bingli.png"},
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
    //this._getBanner();
  },

  //---------------------网络请求相关方法----------
  _getBanner() {
    getBanner().then(res => {
      console.log(res[0]);
      this.setData({
        banners: res[0].items
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