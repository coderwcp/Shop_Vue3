import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('@/view/home')
const Cate = () => import('@/view/cate')
const Cart = () => import('@/view/cart')
const Profile = () => import('@/view/profile')
const Detail = () => import('@/view/detail')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cate',
    component: Cate
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
