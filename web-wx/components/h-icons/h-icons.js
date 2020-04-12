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
      const url = e.currentTarget.dataset.url;
      const doctor_id = e.currentTarget.dataset.doctor_id;
      console.log(url);
      if(url=="/pages/record/record" || url == "/pages/serve/serve"){
        wx.switchTab({
          url: url
        })
      }else {
        if(doctor_id != '') {
          console.log("doctor_id",doctor_id);
          wx.navigateTo({
            url: '/pages/reserve/reserve?_id='+doctor_id,
          })
        }
        wx.navigateTo({
          url: url,
        })
      }

      
    }
  }
})
