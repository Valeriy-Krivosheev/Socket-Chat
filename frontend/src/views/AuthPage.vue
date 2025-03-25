<template>
  <div class="min-w-2/6">
    <h2 class="text-2xl my-3">Log in to your account</h2>
    <auth-register-form @on-submit="onAuth" type="auth" />
  </div>
</template>

<script setup lang="ts">
import AuthRegisterForm from '@/components/AuthRegisterForm.vue'
import type { IFormDataReg } from '@/type'
import axios from 'axios'
import { useUserStore } from '@/store/user'
import router from '@/router'
const store = useUserStore()

const onAuth = async (data: IFormDataReg) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      username: data.login,
      password: data.password,
    })

    store.setToken(response.data.token)
    await router.push({ name: 'home' })
  } catch (error) {
    console.error('Error logging in:', error)
  }
}
</script>

<style lang="scss" scoped></style>
