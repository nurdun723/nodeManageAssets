import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:"/index",
    },
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: "about" */ './views/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "about" */ './views/404page.vue')
    }
  ]
})

//路由首位
router.beforeEach((to,from,next)=>{
  let tocken = sessionStorage.getItem('elemToken') ? true : false
  if(to.path == '/login' || to.path == '/register'){
    next()
  }else{
    tocken?next():next('/login');
  }
})
export default router;