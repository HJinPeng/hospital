import request from './network'

export function getHospitalInfo(hospital_id) {
  return request({
    url: '/hospital/' + hospital_id
  })
}

export function getDoctorAndArrange(doctor_id,day) {
  return request({
    url: '/doctor/arrange',
    method: 'POST',
    data: {
      doctor_id,
      day
    }
  })
}

export function toMakeOrder(arrange_id,patient_id) {
  return request({
    url: '/order/add',
    method: 'POST',
    data: {
      arrange_id,
      patient_id
    }
  })
}

export function getOrderInfo(arrange_id,patient_id) {
  return request({
    url: '/order/info',
    method: 'POST',
    data: {
      arrange_id,
      patient_id
    }
  })
}
