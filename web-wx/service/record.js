import request from './network'

export function getOrderList(patient_id) {
  return request({
    url: '/order/list',
    method: 'POST',
    data: {patient_id}
  })
}