import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/main.css'
import { handleRedirect } from './utils/router'

const app = createApp(App)

app.use(router)
app.use(vuetify)

// Handle redirects on app initialization
handleRedirect(router)

app.mount('#app')