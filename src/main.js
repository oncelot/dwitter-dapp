import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import VueMobileDetection from "vue-mobile-detection";


createApp(App).use(router).use(VueMobileDetection).mount('#app')
