<template>
  <div class="min-w-2/6">
    <h2 class="text-2xl my-3">Log in to your account</h2>
    <auth-register-form @on-submit="onAuth" type="auth" />
  </div>
</template>

<script setup lang="ts">
import AuthRegisterForm from '@/components/AuthRegisterForm.vue'
import type { IFormDataReg } from '@/type'

const onAuth = (data: IFormDataReg) => {
  console.log(data)
}
</script>

<style lang="scss" scoped></style>
