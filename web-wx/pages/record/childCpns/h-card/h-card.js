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
      let arrange_id = option.currentTarget.dataset.arrange_id;
      const patient_id = wx.getStorageSync('patientInfo')._id;
      
      wx.navigateTo({
        url: '/pages/order/order?arrange_id='+arrange_id+'&patient_id='+patient_id,
      })
    }
  }
})
