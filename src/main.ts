import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    }
  },
  components: {
    accordion: {
        panel: {
            border: {
                color: "#fff"
            }
        },
      header: {
        padding: 0,
        background: '#fff',
        border: {
          color: '#fff'
        },
        active: {
          background: '#fff',
          hover: {
            background: '#fff'
          }
        },
        hover: {
          background: '#fff'
        },
        toggle: {
          icon: {
            color: '#000',
            active: {
              color: '#000',
              hover: {
                color: '#000'
              }
            },
            hover: {
              color: '#000'
            }
          }
        }
      },
      content: {
        background: '#fff',
        padding: '1rem 0'
      }
    }
  }
})

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset
  }
})
app.use(ElementPlus)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      staleTime: 0,
      networkMode: 'always'
    },
    mutations: {
      networkMode: 'always',
      onError: (err: any) => {
        if (err.response) {
          if (err.response.status === 401) {
            window.location.href = '/auth/sign-in'
          }
        }
      }
    }
  }
})

app.use(VueQueryPlugin, {
  queryClient
})

app.mount('#app')
