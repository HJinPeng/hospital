// pages/serve/childCpns/h-hot/h-hot.js
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
    // ----------------点击跳转到医院详情
    clickHospital(event){
      console.log(event);
      const _id = event.currentTarget.dataset.model._id;
      wx.navigateTo({
        url: '/pages/hospital/hospital?_id='+_id
      })
    }
  }
})
