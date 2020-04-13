// pages/reserve/childCpns/h-date/h-date.js
import {
  getOrderIsExist
} from '../../../../service/hospital'
import Notify from '@vant/weapp/notify/notify';
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
    active_id: "",
    has_number: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // ----------------- 点击时间段-------------
    clickItem(event) {
      console.log(event);
      const _id = event.currentTarget.dataset._id;
      const has_number = event.currentTarget.dataset.number == 0 ? false:true;
      this.setData({
        active_id: _id,
        has_number
      })
    },
    
    // ------------------------ 去挂号 --------------------
    toOrder() {
      const has_number = this.data.has_number;
      if(has_number) {
        const arrange_id = this.data.active_id;
        const patient_id = wx.getStorageSync('patientInfo')._id;
        getOrderIsExist(arrange_id,patient_id).then(result => {
          const res = result.data;
          if(result.statusCode == 402) {
            Notify({ type: 'warning', message: res,context: this });
          }else if(result.statusCode == 200) {
            wx.navigateTo({
              url: '/pages/order/order?arrange_id='+arrange_id+'&patient_id='+patient_id+'&type=nopay',
            })
          }
        })
      }else {
        Notify({ type: 'warning', message: '请选择其他时间段',context: this });
      }
      
    }
  }
})
