import request from './network'

export function getOrderList(patient_id) {
  return request({
    url: '/order/list',
    method: 'POST',
    data: {patient_id}
  })
}

export function getHistoryList(patient_id) {
  return request({
    url: '/history/list',
    method: 'POST',
    data: {patient_id}
  })
}

export function getOneHistory(history_id) {
  return request({
    url: '/history/'+history_id
  })
}