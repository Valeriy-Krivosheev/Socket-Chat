import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userStore = ref()
  const user = computed(() => userStore.value)

  return { userStore, user }
})
