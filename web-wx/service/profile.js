import request from './network'

export function changePass(patient_id,password) {
  return request({
    url: '/changepass',
    method: 'PUT',
    data: {
      patient_id,
      password
    }
  })
}

export function getPatientInfo(patient_id) {
  return request({
    url: '/patient/'+patient_id
  })
}

export function changeInfo(patient_id,model) {
  return request({
    url: '/changeinfo',
    method:'PUT',
    data: {
      patient_id,
      model
    }
  })
}

