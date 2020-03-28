import axios from 'axios'
import Vue from  'vue'
import router from '../router'
export function request(config) {
  const instance = axios.create({
    //baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    baseURL: 'http://localhost:3000/admin/api'
  })

  
  return instance(config)
}

