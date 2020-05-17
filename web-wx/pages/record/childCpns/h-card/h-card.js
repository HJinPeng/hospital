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
      let history_id = option.currentTarget.dataset.history_id;
      console.log('arrange_id',arrange_id);
      console.log('history_id',history_id);
      if(arrange_id) {
        const patient_id = wx.getStorageSync('patientInfo')._id;
        wx.navigateTo({
          url: '/pages/order/order?arrange_id='+arrange_id+'&patient_id='+patient_id,
        })
      }else if(history_id) {
        wx.navigateTo({
          url: '/pages/history/history?history_id='+history_id
        })
      }
      
    }
  }
})
