import request from './network'

export function getBanner() {
  return request({
    url: '/home/ad'
  })
}

export function getArticles() {
  return request({
    url: '/article/list'
  })
}

export function getOneArticle(id) {
  return request({
    url: '/article/'+id
  })
}
