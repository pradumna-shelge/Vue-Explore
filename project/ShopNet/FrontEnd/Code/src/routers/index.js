import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import Login from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import Dashboard from '../components/adminModule/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem('userInfo') != null;
      if (!isAuthenticated) {
        next();
      } else {
        next({ name: 'homepage' });
      }
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem('userInfo') != null;
      if (!isAuthenticated) {
        next();
      } else {
        next({ name: 'homepage' });
      }
    },
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem('userInfo') != null;
      if (isAuthenticated) {
        next();
      } else {
        next({ name: 'login' });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
