import { createRouter, createWebHistory } from 'vue-router'
import Firebase from '../views/Firebase.vue'
import TwitterUI from '../views/TwitterUI.vue'

const routes = [
  {
    path: '/firebase',
    name: 'Firebase',
    component: Firebase
  },
  {
    path: '/twitterui',
    name: 'Twitter UI',
    component: TwitterUI
  },
  {
    path: '/login',
    name: 'LoginAuth',
    component: () => import('../views/LoginAuth.vue')
  },
  {
    path: '/register',
    name: 'RegisterAuth',
    component: () => import('../views/RegisterAuth.vue')
  },
  {
    path: '/firebase-home',
    name: 'FirebaseHome',
    component: () => import('../views/FirebaseHome.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: TwitterUI,
    iconClass: 'fas fa-home', 
    mainMenu : true
  },
  {
    path: '/explore',
    name: 'Explore',
    component: TwitterUI,
    iconClass: 'fas fa-search', 
    mainMenu : true
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: TwitterUI,
    iconClass: 'fas fa-bell', 
    mainMenu : true
  },
  {
    path: '/messages',
    name: 'Messages',
    component: TwitterUI,
    iconClass: 'fas fa-envelope', 
    mainMenu : true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: TwitterUI
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
