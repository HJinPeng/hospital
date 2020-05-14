import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = ()=>import('../views/Main.vue');
const Login = ()=>import('../views/Login.vue');
const AdEdit = ()=>import('../views/operate/AdEdit.vue');
const AdList = ()=>import('../views/operate/AdList.vue');
const ArticleEdit = ()=>import('../views/operate/ArticleEdit.vue');
const ArticleList = ()=>import('../views/operate/ArticleList.vue');
const HospitalEdit = ()=>import('../views/hospital/HospitalEdit.vue');
const HospitalList = ()=>import('../views/hospital/HospitalList.vue');
const HospitalChangePass = ()=>import('../views/hospital/HospitalChangePass.vue');
const PatientList = ()=>import('../views/patient/PatientList.vue');
const PatientEdit = ()=>import('../views/patient/PatientEdit.vue');

const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/ads/create', name: 'AdEdit', component: AdEdit },
      { path: '/ads/edit/:id', name: 'AdEdit', props: true, component: AdEdit },
      { path: '/ads/list', name: 'AdList', component: AdList },

      { path: '/article/create', name: 'ArticleEdit', component: ArticleEdit },
      { path: '/article/edit/:id', name: 'ArticleEdit', props: true, component: ArticleEdit },
      { path: '/article/list', name: 'ArticleList', component: ArticleList },
      
      { path: '/hospital/create', name: 'HospitalEdit', component: HospitalEdit },
      { path: '/hospital/edit/:id', name: 'HospitalEdit', props: true, component: HospitalEdit },
      { path: '/hospital/list', name: 'HospitalList', component: HospitalList },
      { path: '/hospital/changepass/:id', name: 'HospitalChangePass', props: true, component: HospitalChangePass },

      { path: '/patient/edit/:id', name: 'PatientEdit', props: true, component: PatientEdit },
      { path: '/patient/list', name: 'PatientList', component: PatientList },
      { path: '/patient/changepass/:id', name: 'HospitalChangePass', props: true, component: HospitalChangePass },
    ]
  },
 
]

const router = new VueRouter({  
  routes,
  // mode: 'history'
});

// 每次进入路由前
router.beforeEach((to,from,next)=>{
  console.log(to.meta);
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login');
  }
  next();
})

export default router