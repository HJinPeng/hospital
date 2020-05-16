import request from './network'

export function getHospital() {
  return request({
    url: '/hospital',
    method: 'POST'
  })
}

export function getDoctors() {
  return request({
    url: '/doctor/list'
  })
}
