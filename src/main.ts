import './assets/main.css'
import 'primevue/resources/themes/aura-light-noir/theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
