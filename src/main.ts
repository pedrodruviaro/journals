import './assets/main.css'
import 'primevue/resources/themes/aura-light-noir/theme.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './libs/firebase'

const app = createApp(App)

app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})
app.use(PrimeVue)
app.use(ToastService)

app.mount('#app')
