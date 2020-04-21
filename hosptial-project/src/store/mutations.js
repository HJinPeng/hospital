import {
  SET_TOKEN,
  SET_HOSPITAL_NAME,
  SET_DOCTOR_LIST,
  SET_INQUIRY,
  SET_EXAM_LIST,
  SET_MEDIC_LIST,
  SET_MEDIC_CHOOSE,
  SET_EXAM_CHOOSE,
  SET_CASE_EXAM,
  SET_CASE_MEDIC,
  SET_CASE_ALL_PRICE,
  SET_CASE_RECORD,
  SET_CASE_ID,
  SET_CASE_INIT,
  OLD_ORDER_ID
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
  },
  [SET_MEDIC_CHOOSE](state,medicchoose) {
    state.medicChoose = medicchoose;
  },
  [SET_EXAM_CHOOSE](state,examchoose) {
    state.examChoose = examchoose;
  },
  [SET_CASE_EXAM](state,payload) {
    state.caseHistory.examItem = payload.examItem;
    state.caseHistory.examPrice = payload.examPrice;
  },
  [SET_CASE_MEDIC](state,payload) {
    state.caseHistory.medicItem = payload.medicItem;
    state.caseHistory.medicPrice = payload.medicPrice;
  },
  [SET_CASE_ALL_PRICE](state,allPrice){
    state.caseHistory.allPrice = allPrice;
  },
  [SET_CASE_RECORD](state,payload) {
    state.caseHistory.talk = payload.talk;
    state.caseHistory.now = payload.now;
    state.caseHistory.physique = payload.physique;
    state.caseHistory.handle = payload.handle;
  },
  [SET_CASE_ID](state,payload) {
    state.caseHistory.order_id = payload.order_id;
    state.caseHistory.patient_id = payload.patient_id;
    state.caseHistory.arrange_id = payload.arrange_id;
    state.caseHistory.doctor_id = payload.doctor_id;
    state.caseHistory.hospital_id = payload.hospital_id;
    state.caseHistory.day = payload.day;
    state.caseHistory.time = payload.time;
  },
  [SET_CASE_INIT](state) {
    state.medicChoose = [];
    state.examChoose = [];
    state.caseHistory = {
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
    }
  },
  [OLD_ORDER_ID](state,order_id) {
    state.old_order_id = order_id;
  }
}

export default mutations
