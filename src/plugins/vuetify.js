import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa } from 'vuetify/iconsets/fa'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/scss/main.scss'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {}
      },
      dark: {
        colors: {
          background: '#121212',
          surface: '#4C4C4C', // v-select items bg
          'on-surface': '#ffffff',
          'neutral-100': '#1E1E1E',
          'neutral-200': '#2E2E2E',
          'neutral-300': '#3D3D3D',
          'neutral-400': '#4C4C4C',
          primary: '#8D48A0',
          'on-primary': '#FFF',
          secondary: '#FD6718',
          'on-secondary': '#FFF',
          accent: '#C59CD1'
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa, // e.g fa:fas fa-home (when mdi is default)
      mdi // e.g mdi:mdi-plus (when fa is default)
    }
  }
})
