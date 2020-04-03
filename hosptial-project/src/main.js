// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css' 
// import 'element-ui/lib/theme-default/index.css';
//import 'element-ui/lib/theme-default/index.css'


import moment from 'moment'
moment.locale('zh-cn');
Vue.prototype.$moment = moment;

import request from './http'
Vue.prototype.$request = request
// Vue.prototype.$request = axios.create({
//   baseURL:  'http://localhost:3000/doctor/api'
//   // baseURL: 'http://localhost:3000/web/api'
// })
Vue.use(ElementUI)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
