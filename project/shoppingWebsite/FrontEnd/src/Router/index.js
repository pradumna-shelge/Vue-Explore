import {createRouter, createWebHistory } from 'vue-router'
import homepage from '../components/HomePage.vue'
import login from '../components/login.vue'
const routes = [
    {
        path:'/',
        name:'homepage',
        component:homepage
    },
    {
  path:'/login',
        name:'login',
        component:login
    }
]

const router=createRouter({
    history: createWebHistory(), routes
})

export default router