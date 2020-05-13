import {request} from './request'

export function hospitalAdd(model){
  return request({
    url:'/hospital/add',
    method: 'post',
    data: model
  })
}

export function hospitalEdit(id,model){
  return request({
    url:'/hospital/edit/'+id,
    method: 'put',
    data: model
  })
}

export function getHospitals(){
  return request({
    url:'/hospital/list'
  })
}

export function getOneHospital(id){
  return request({
    url:'/hospital/'+id
  })
}



export function delHospital(id){
  return request({
    url:'/hospital/del/'+id,
    method:'delete'
  })
}

export function changeHospitalPass(id,password){
  return request({
    url:'/hospital/edit/'+id,
    method: 'put',
    data: {password}
  })
}