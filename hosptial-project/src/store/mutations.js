import {
  SET_TOKEN,
  SET_HOSPITAL_NAME,
	SET_DOCTOR_LIST
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
	}
}

export default mutations
