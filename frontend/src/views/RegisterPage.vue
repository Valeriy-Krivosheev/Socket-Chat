<template>
  <div class="min-w-2/6">
    <h2 class="text-2xl my-3">Create a new account</h2>
    <auth-register-form @on-submit="onRegister" type="registration" />
  </div>
</template>

<script setup lang="ts">
import AuthRegisterForm from '@/components/AuthRegisterForm.vue'
import type { IFormDataReg } from '@/type'
import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/store/user'
const store = useUserStore()
const { setUser } = store

const onRegister = async (data: IFormDataReg) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username: data.login,
      password: data.password,
      timeEntering: Date.now(),
    })

    console.log('User registered:', response.data)
    setUser(response.data)
    await router.push({ name: 'home' })
  } catch (error) {
    console.error('Error registering:', error)
  }
}
</script>

<style lang="scss" scoped></style>
