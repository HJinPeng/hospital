// pages/home/childCpns/h-article/h-article.js
Component({
  externalClasses:['out-h-article'],
  properties: {
    lists: {
      type: Array,
      value: []
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickArticle(event){
      console.log(event);
      const id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/article/article?id='+id,
      })
    }
  }
})
