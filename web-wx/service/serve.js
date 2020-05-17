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

export function searchHospital(value) {
  return request({
    url: '/hospital/search/'+value
  })
}