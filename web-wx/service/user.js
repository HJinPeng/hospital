import request from './network'

export function registerUser(model) {
  return request({
    url: '/register',
    method: 'POST',
    data: model
  })
}

export function loginUser(model) {
  return request({
    url: '/login',
    method: 'POST',
    data: model
  })
}
