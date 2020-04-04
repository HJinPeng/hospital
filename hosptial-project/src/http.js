import store from './store'
import axios from 'axios'
import Vue from 'vue'
import router from './router/index.js'

const http = axios.create({
  baseURL: 'http://localhost:3000/hospital/api'
})
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (store.state.token) {
    config.headers.Authorization = 'Bearer ' + store.state.token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
http.interceptors.response.use(res => {
  //console.log(res);
  return res
}, err => {
  console.log(err.response);
  if(err.response.status == 422) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data
    })
  }
  // if (err) {
  //   Vue.prototype.$message({
  //     type: 'error',
  //     message: '账号密码错误'
  //   })

  //   // if (err.response.status === 401) {
  //   //   router.push('/login')
  //   // }
  // }

  return Promise.reject(err)
})

export default http
