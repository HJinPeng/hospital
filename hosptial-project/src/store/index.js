import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  hospitalInfo: {},
  token:'',
	doctorList: [],
  inquiry: {},
  examList: [],
  medicList: [],
  medicChoose: [],
  examChoose: [],
  caseHistory: {
    order_id: '',
    patient_id: '',
    arrange_id: '',
    doctor_id: '',
    hospital_id: '',
    talk:'',
    now: '',
    physique: '',
    handle: '',
    examItem: '', // ‘眼科、口腔科’
    examPrice: '',
    medicItem: '', // '维生素C*2(一天两次，一次一颗)，维生素A*4(无)'
    medicPrice: '',
    allPrice: '',
    day: '',
    time: ''
  },
  old_order_id: '', // 用来对比订单是否是原来的订单
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store;
