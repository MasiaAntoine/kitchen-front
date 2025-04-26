import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/lib/axios'
import { VueQueryPlugin } from '@tanstack/vue-query'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.timeout = 10000

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
