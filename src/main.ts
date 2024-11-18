import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import Select2 from "@/components/Select2.vue"


const app = createApp(App)

app.use(router)

app.component("select2", Select2)

app.mount('#app')
