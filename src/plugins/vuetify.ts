import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Custom theme with glassmorphism
const glassmorphismTheme = {
  dark: true,
  colors: {
    primary: '#3b5a7b',
    secondary: '#6C63FF',
    accent: '#FF4081',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: 'rgba(18, 18, 18, 0.8)',
    surface: 'rgba(255, 255, 255, 0.1)',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'glassmorphismTheme',
    themes: {
      glassmorphismTheme,
    },
  },
  defaults: {
    VCard: {
      class: 'glass-card',
      style: {
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '15px',
      },
    },
    VBtn: {
      class: 'glass-button',
      style: {
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
    },
  },
})