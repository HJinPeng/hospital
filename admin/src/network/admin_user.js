import {request} from './request'

export function adminLogin(model){
  return request({
    url:'/login',
    method: 'post',
    data: model
  })
}