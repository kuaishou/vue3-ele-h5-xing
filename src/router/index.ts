import { createRouter, createWebHistory } from 'vue-router'
import TabsView from '../views/tabs/TabsView.vue'
import HomeView from '@/views/tabs/home/HomeView.vue'
import MeView from '../views/tabs/me/MeView.vue'
import OderView from '../views/tabs/oder/OderView.vue'
import LoginView from '../views/login/LoginView.vue'
import ShopView from '../views/shop/ShopView.vue'
import GoodsView from '../views/goods/GoodsView.vue'

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
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/shop/:id',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component: GoodsView
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
