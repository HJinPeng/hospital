import {request} from './request'


export function patientEdit(id,model){
  return request({
    url:'/patient/edit/'+id,
    method: 'put',
    data: model
  })
}

export function getPatients(){
  return request({
    url:'/patient/list'
  })
}

export function getOnePatient(id){
  return request({
    url:'/patient/'+id
  })
}



export function delPatient(id){
  return request({
    url:'/patient/del/'+id,
    method:'delete'
  })
}

export function changePatientPass(id,password){
  return request({
    url:'/patient/edit/'+id,
    method: 'put',
    data: {password}
  })
}