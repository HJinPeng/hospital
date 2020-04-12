// pages/reserve/childCpns/h-date/h-date.js

Component({
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
    active_id: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // ----------------- 点击时间段-------------
    clickItem(event) {
      console.log(event);
      const _id = event.currentTarget.dataset._id;
      this.setData({
        active_id: _id
      })
    },
    
    // ------------------------ 去挂号 --------------------
    toOrder() {
      const arrange_id = this.data.active_id;
      const patient_id = wx.getStorageSync('patientInfo')._id;
      wx.navigateTo({
        url: '/pages/order/order?arrange_id='+arrange_id+'&patient_id='+patient_id+'&type=nopay',
      })
    }
  }
})
