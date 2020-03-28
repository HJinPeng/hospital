// components/h-icons/h-icons.js
Component({
  externalClasses: ['out-h-icons'],
  properties: {
    lists: {
      type: Array,
      value: []
    }
  },
  data: {

  },
  methods: {
    iconClick: (e) => {
      console.log(e);
      let url = e.currentTarget.dataset.url;
      console.log(url);
      if(url=="/pages/record/record" || url == "/pages/serve/serve"){
        wx.switchTab({
          url: url
        })
      }else {
        wx.navigateTo({
          url: url,
        })
      }

      
    }
  }
})
