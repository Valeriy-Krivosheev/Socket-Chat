import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUserCreated } from '@/type'
import axios from '@/axios'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const userStore = ref()
  const user = computed(() => userStore.value)
  const userToken = ref(localStorage.getItem('chat-token') || '')
  const token = computed(() => userToken.value)
  const isAuthenticated = ref(false)
  const isProfileLoading = ref(false)

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
      await router.push({ name: 'auth' })
    }
    try {
      isProfileLoading.value = true
      const response = await axios.get('auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      setUser(response.data.user)
      isAuthenticated.value = true
    } catch (error) {
      localStorage.removeItem('chat-token')
      isAuthenticated.value = false
      await router.push({ name: 'auth' })
    } finally {
      isProfileLoading.value = false
    }
  }

  return { userStore, user, setToken, token, checkAuth, isAuthenticated, isProfileLoading }
})
