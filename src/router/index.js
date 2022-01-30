import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
      
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/docs',
      name: 'Docs',
      component: () => import(/* webpackChunkName: "about" */ '../views/Docs.vue')
    },
    {
      path: '/id/:id',
      name: 'Dwitter Id',
      props: true ,
      component: () => import(/* webpackChunkName: "about" */ '../views/DwitterId.vue')
    },
    {
      path: '/my-dwitter',
      name: 'My Dwitter',
      props: true ,
      component: () => import(/* webpackChunkName: "about" */ '../views/MyDwitter.vue')
    }
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router