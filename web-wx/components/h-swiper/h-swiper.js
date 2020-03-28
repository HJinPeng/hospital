// components/h-swiper/h-swiper.js
Component({
  properties: {
    lists: {
      type: Array,
      value: []
    }
  },
  data: {

  },
  methods: {
    onSwiperTap: (e) => {
      console.log(e);
      let url = e.target.dataset.url;
      console.log(url);
      wx.navigateTo({
        url: url,
      })
    }
  }
})
