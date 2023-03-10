import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/Home/home.vue'),
    children: [
      {
        name: 'welcome',
        path: 'welcome',
        meta: {
          title: '欢迎页'
        },
        component: () => import('@/views/Home/welcome/welcome.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录页'
    },
    component: () => import('@/views/Login/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
