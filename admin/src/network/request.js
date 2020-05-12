import axios from 'axios'
import Vue from  'vue'
import router from '../router'
export function request(config) {
  const instance = axios.create({
    //baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    baseURL: 'http://localhost:3000/admin/api'
  })

  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token){
      config.headers.Authorization = 'Bearer ' + localStorage.token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res
  }, err => {
    // console.log(err.response);
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
  
  return instance(config)
}

