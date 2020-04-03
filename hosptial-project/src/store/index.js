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
  weeks_content:[
    { todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
    { todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
    { todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
    { todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
    { todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
    { todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
    { todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] }
  ]
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store;
