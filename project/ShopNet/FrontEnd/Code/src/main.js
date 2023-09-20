import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routers';
import Toaster from "@meforma/vue-toaster";
import {Vue3TailwindPagination} from "vue-3-tailwind-css-pagination";
const app = createApp(App);


app.component('Vue3TailwindPagination', Vue3TailwindPagination);


app.use(router); 
app.use(Toaster, {
  position: "top",
});


app.mount('#app');

