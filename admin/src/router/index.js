import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = ()=>import('../views/Main.vue');
const AdEdit = ()=>import('../views/operate/AdEdit.vue');
const AdList = ()=>import('../views/operate/AdList.vue');

const routes = [
  // {
  //   path: '/login',
  //   component: Login,
  //   meta: {
  //     isPublic: true
  //   }
  // },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/ads/create', name: 'AdEdit', component: AdEdit },
      { path: '/ads/edit/:id', name: 'AdEdit', props: true, component: AdEdit },
      { path: '/ads/list', name: 'AdList', component: AdList },
    ]
  },
 
]

const router = new VueRouter({  
  routes,
  mode: 'history'
});

// // 每次进入路由前
// router.beforeEach((to,from,next)=>{
//   console.log(to.meta);
//   if(!to.meta.isPublic && !localStorage.token){
//     return next('/login');
//   }
//   next();
// })

export default router