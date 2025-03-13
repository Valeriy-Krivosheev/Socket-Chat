import { ref, watchEffect } from 'vue'
import type { IUserCreated } from '@/type.ts'

export default function useUser() {
  const STORAGE_KEY = 'chatUser'
  const storedUser = localStorage.getItem(STORAGE_KEY)

  const user = ref<IUserCreated | null>(
    storedUser ? (JSON.parse(storedUser) as IUserCreated) : null,
  )

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

  const currentUserCheck = (msgUser: IUserCreated, user: IUserCreated | null) => {
    isCurrentUser.value = msgUser.id === user?.id
  }
  const isCurrentUser = ref(false)

  return {
    user,
    saveUser,
    clearUserName,
    isCurrentUser,
    currentUserCheck,
  }
}
