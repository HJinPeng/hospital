// pages/record/childCpns/h-card/h-card.js
Component({
  externalClasses:['out-h-card'],
  properties: {
    lists:{
      type: Object,
      value: {}
    }
  },
  data: {

  },
  methods: {
    cardClick(option){
      let url = option.currentTarget.dataset.url;
      
      console.log(url)
      wx.navigateTo({
        url: url,
      })
    }
  }
})
