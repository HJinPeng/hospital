import {
  SET_TOKEN,
  SET_HOSPITAL_NAME,
  SET_DOCTOR_LIST,
  SET_INQUIRY,
  SET_EXAM_LIST,
  SET_MEDIC_LIST
} from './mutations-types.js'

const mutations = {
  [SET_TOKEN](state,token) {
    state.token = token;
  },
  [SET_HOSPITAL_NAME](state,hospitalInfo) {
    state.hospitalInfo = hospitalInfo;
  },
	[SET_DOCTOR_LIST](state,doctorList) {
		state.doctorList = doctorList;
  },
  [SET_INQUIRY](state,inquiry) {
    state.inquiry = inquiry;
  },
  [SET_EXAM_LIST](state,examlist){
    state.examList = examlist;
  },
  [SET_MEDIC_LIST](state,mediclist) {
    state.medicList = mediclist;
  }
}

export default mutations
