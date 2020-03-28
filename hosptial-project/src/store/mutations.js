import {
  SET_TOKEN,
  SET_HOSPITAL_NAME
} from './mutations-types.js'

const mutations = {
  [SET_TOKEN](state,token) {
    state.token = token;
  },
  [SET_HOSPITAL_NAME](state,name) {
    state.hospitalInfo.name = name;
  }
}

export default mutations
