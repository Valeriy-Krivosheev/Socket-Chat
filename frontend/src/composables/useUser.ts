import { ref, watchEffect } from 'vue'
import type { IUserCreated } from '@/type.ts'

export function useUser() {
  const STORAGE_KEY = 'chatUser'

  const user = ref<IUserCreated>(JSON.parse(localStorage.getItem(STORAGE_KEY)) as IUserCreated)

  watchEffect(() => {
    if (user.value?.name !== null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  })
  const saveUser = (newUser: IUserCreated) => {
    user.value = newUser
  }

  const clearUserName = () => {
    user.value = null
  }

  return {
    user,
    saveUser,
    clearUserName,
  }
}
