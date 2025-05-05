import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { debug } from './utils/debug'

const app = createApp(App)

debug.log('Application initialized')

app.use(router)

debug.log('Router mounted')

app.mount('#app')

debug.log('Application mounted to DOM')