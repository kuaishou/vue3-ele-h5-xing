import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import TabsView from '../views/tabs/TabsView.vue'
import HomeView from '@/views/tabs/home/HomeView.vue'
import MeView from '../views/tabs/me/MeView.vue'
import OderView from '../views/tabs/oder/OderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: './home'
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
      children: [
        { name: 'home', path: '/home', component: HomeView },
        { name: 'me', path: '/me', component: MeView },
        { name: 'oder', path: '/oder', component: OderView }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/TabsView.vue')
    // }
  ]
})

export default router
