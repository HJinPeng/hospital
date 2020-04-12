import request from './network'

export function getHospital() {
  return request({
    url: '/hospital',
    method: 'POST'
  })
}