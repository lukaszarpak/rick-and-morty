/* base */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

/* UI components */
import PrimeVue from 'primevue/config'

createApp(App).use(PrimeVue).use(store).mount('#app')
