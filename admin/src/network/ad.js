import {request} from './request'

export function adAdd(model){
  return request({
    url:'/ad/add',
    method: 'post',
    data: model
  })
}

export function adEdit(id,model){
  return request({
    url:'/ad/edit/'+id,
    method: 'put',
    data: model
  })
}

export function getAds(){
  return request({
    url:'/ad/list'
  })
}

export function getOneAd(id){
  return request({
    url:'/ad/'+id
  })
}



export function delAd(id){
  return request({
    url:'/ad/del/'+id,
    method:'delete'
  })
}