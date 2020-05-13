import {request} from './request'

export function articleAdd(model){
  return request({
    url:'/article/add',
    method: 'post',
    data: model
  })
}

export function articleEdit(id,model){
  return request({
    url:'/article/edit/'+id,
    method: 'put',
    data: model
  })
}

export function getArticles(){
  return request({
    url:'/article/list'
  })
}

export function getOneArticle(id){
  return request({
    url:'/article/'+id
  })
}



export function delArticle(id){
  return request({
    url:'/article/del/'+id,
    method:'delete'
  })
}