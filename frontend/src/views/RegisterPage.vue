<template>
  <div class="min-w-2/6">
    <h2 class="text-4xl my-10 text-center">Create a new account</h2>
    <auth-register-form @on-submit="onRegister" type="registration" />
  </div>
</template>

<script setup lang="ts">
import AuthRegisterForm from '@/components/AuthRegisterForm.vue'
import type { IFormDataReg } from '@/type'
import axios from '@/axios'
import router from '@/router'

const onRegister = async (data: IFormDataReg) => {
  await axios.post('auth/register', {
    username: data.login,
    password: data.password,
    timeEntering: Date.now(),
  })
  await router.push({ name: 'auth' })
}
</script>

<style lang="scss" scoped></style>
