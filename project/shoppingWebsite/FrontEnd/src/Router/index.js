import {createRouter, createWebHistory } from 'vue-router'
import homepage from '../components/HomePage.vue'
import login from '../components/login.vue'
import error from '../components/error.vue'
import signup from '../components/signUp.vue'
import dashboard from '../components/Admin/dashboard.vue'
const routes = [
    {
        path:'/',
        name:'homepage',
        component:homepage
    },
    {
  path:'/login',
        name:'login',
        component:login,
             beforeEnter: (to, from, next) => {
    
      const isAuthenticated = localStorage.getItem('userInfo') != null; 
      
      if (!isAuthenticated) {
       
        next();
      } else {
       
        next({ name: 'homepage' });
      }
    }
    }, {
  path:'/signup',
        name:'signup',
        component:signup,
             beforeEnter: (to, from, next) => {
    
      const isAuthenticated = localStorage.getItem('userInfo') != null; 
      
      if (!isAuthenticated) {
       
        next();
      } else {
       
        next({ name: 'homepage' });
      }
    }
    },
    {
  path:'/error',
        name:'error',
        component:error
    },
    {
         path:'/dashboard',
        name:'dashboard',
        component:dashboard,
        beforeEnter: (to, from, next) => {
    
      const isAuthenticated = localStorage.getItem('userInfo') != null; 
      
      if (isAuthenticated) {
       
        next();
      } else {
       
        next({ name: 'login' });
      }
    }
    }
]

const router=createRouter({
    history: createWebHistory(), routes
})

export default router