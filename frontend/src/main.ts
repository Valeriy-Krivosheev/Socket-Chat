import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import api from '@/axios'
import { useErrorStore } from '@/store/error'
import { v4 as uuidv4 } from 'uuid'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
const errorStore = useErrorStore()

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('chat-token')}` || ''
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    errorStore.addErrorMsg({
      id: uuidv4(),
      text: error.response?.data?.message || 'Some error occurred',
    })
    return Promise.reject(null)
  },
)

app.mount('#app')
