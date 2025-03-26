import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUserCreated } from '@/type'
import axios from '@/axios'

export const useUserStore = defineStore('user', () => {
  const userStore = ref()
  const user = computed(() => userStore.value)
  const userToken = ref(localStorage.getItem('chat-token') || '')
  const token = computed(() => userToken.value)
  const isAuthenticated = ref(false)

  const setUser = (data: IUserCreated) => {
    userStore.value = data
  }
  const setToken = (token: string) => {
    userToken.value = token
    localStorage.setItem('chat-token', token)
  }
  const checkAuth = async () => {
    if (!token.value) {
      isAuthenticated.value = false
      return
    }
    try {
      const response = await axios.get('auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      setUser(response.data.user)
      isAuthenticated.value = true
    } catch (error) {
      console.error('Error checking auth:', error)
      // localStorage.removeItem('chat-token')
      isAuthenticated.value = false
    }
  }

  return { userStore, user, setToken, token, checkAuth, isAuthenticated }
})
