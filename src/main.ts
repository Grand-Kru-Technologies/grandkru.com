import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/main.css'
import { handleRedirect } from './utils/router'
import { AuthService } from './services/authService'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

// Initialize auth service
AuthService.init()

// Handle redirects on app initialization
handleRedirect(router)

app.mount('#app')