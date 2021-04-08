import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseCard from './components/ui/BaseCard.vue'

createApp(App)
.use(store)
.use(router)
.component('base-card', BaseCard)
.mount('#app')
