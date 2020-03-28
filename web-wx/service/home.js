import request from './network'

export function getBanner() {
  return request({
    url: '/home/ad'
  })
}