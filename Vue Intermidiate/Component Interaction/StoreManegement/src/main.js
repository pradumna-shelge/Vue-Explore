import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/counterStore' 


const app = createApp(App)
app.use(store) 
app.mount('#app')
