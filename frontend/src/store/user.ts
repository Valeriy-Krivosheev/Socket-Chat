import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUserCreated } from '@/type'

export const useUserStore = defineStore('user', () => {
  const userStore = ref()
  const user = computed(() => userStore.value)

  const setUser = (data: IUserCreated) => {
    userStore.value = data
  }

  return { userStore, user, setUser }
})
