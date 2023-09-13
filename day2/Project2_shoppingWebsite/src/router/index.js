import {createRouter, createWebHistory } from 'vue-router';

import login from '../components/login.vue';
import welcome from '../components/Welcome.vue'

const routes=[
    {
        path:'/',
        name:"login",
        component:login
    },
    {
          path:'/home',
        name:"home",
        component:welcome
    }
]

const router = createRouter({
        history: createWebHistory(), routes

})

export default router

