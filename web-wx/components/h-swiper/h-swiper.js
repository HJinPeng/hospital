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
      // let url = e.target.dataset.url;
      const id = e.target.dataset.id;
      wx.navigateTo({
        url: '/pages/article/article?id='+id
      })
    }
  }
})
