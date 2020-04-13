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

// ------------- 挂号-------------
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

// ------------------- 获取订单信息
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

// --------------- 判断是否已经存在某医生某排班上的订单-----------
export function getOrderIsExist(arrange_id,patient_id) {
  return request({
    url: '/order/isexist',
    method: 'POST',
    data: {
      arrange_id,
      patient_id
    }
  })
}
