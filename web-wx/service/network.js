import {
  baseURL,
  timeout
} from './config'

function request(options) {
  wx.showLoading({
    title: '数据加载中...',
  })

  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + options.url,
      timeout,
      method: options.method,
      data: options.data,
      success: function(res){
        resolve(res);
      },
      fail: reject,
      complete: res => {
        wx.hideLoading();
      }
    })
  })
}

export default request;