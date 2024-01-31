import { createApp } from 'vue'
import { createPinia } from "pinia";
import router from "./router"
import './style.css'
import App from './App.vue'

const store = createPinia();

createApp(App)
.use(router)
.use(store)
.mount('#app')
