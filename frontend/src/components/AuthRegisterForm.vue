<template>
  <form @submit.prevent="onSubmit" class="mx-auto bg-blue-100 p-10 rounded-lg">
    <div class="mb-5">
      <label for="login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Your nickname</label
      >
      <input
        id="login"
        v-model="formData.login"
        type="text"
        class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
        placeholder="Ivan Petrov"
        required
      />
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Your password</label
      >
      <input
        v-model="formData.password"
        type="password"
        id="password"
        class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
        required
      />
    </div>
    <div v-if="type === 'registration'" class="mb-5">
      <label
        for="repeat-password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Repeat password</label
      >
      <input
        v-model="formData.repeatPassword"
        type="password"
        id="repeat-password"
        class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
        required
      />
      <span v-if="!isMinPasswordLength" class="text-red-500 text-sm"
        >The password must contain at least 6 characters.</span
      >
      <span
        v-if="!isRepeatedPasswordCorrent && formData.repeatPassword?.length"
        class="text-red-500 text-sm block my-2"
        >Passwords don't match</span
      >
    </div>
    <div v-if="type === 'registration'" class="flex items-start mb-5">
      <div class="flex items-center h-5">
        <input
          id="terms"
          type="checkbox"
          v-model="formData.isTermsAgreed"
          class="cursor-pointer w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          required
        />
      </div>
      <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >I agree with the
        <a href="#" class="text-blue-600 hover:underline dark:text-blue-500"
          >terms and conditions</a
        ></label
      >
    </div>
    <button
      :disabled="isSubmitDisabled"
      type="submit"
      class="disabled:cursor-default disabled:bg-gray-300 cursor-pointer text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 enabled:focus:outline-none enabled:focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <template v-if="type === 'registration'">Register new account</template>
      <template v-else>Log in</template>
    </button>

    <p v-if="type === 'auth'" class="my-3">
      Don't have an account?
      <router-link class="underline" :to="{ name: 'register' }">Sign up</router-link>
    </p>
    <p v-if="type === 'registration'" class="my-3">
      Already got an account?
      <router-link class="underline" :to="{ name: 'auth' }">Sign in</router-link>
    </p>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, Ref } from 'vue'
import type { IFormDataReg, TFormDataAuth } from '@/type'

const props = defineProps<{
  type: 'auth' | 'registration'
}>()

const formData: Ref<IFormDataReg> = ref({
  login: '',
  password: '',
  repeatPassword: '',
  isTermsAgreed: false,
})
type SubmitData<T extends 'auth' | 'registration'> = T extends 'auth' ? TFormDataAuth : IFormDataReg

const emit = defineEmits<{
  (e: 'onSubmit', data: SubmitData<typeof props.type>): void
}>()

const onSubmit = () => {
  if (props.type === 'registration') {
    const data: IFormDataReg = formData.value
    emit('onSubmit', data)
  } else {
    const data: TFormDataAuth = {
      login: formData.value.login,
      password: formData.value.password,
    }
    emit('onSubmit', data)
  }
}

const isRepeatedPasswordCorrent = computed(() => {
  if (props.type === 'registration') {
    return formData.value.password === formData.value.repeatPassword
  }
  return true
})
const isMinPasswordLength = computed(() => formData.value.password.length > 5)

const isSubmitDisabled = computed(() => {
  if (props.type === 'registration') {
    return (
      !isRepeatedPasswordCorrent.value ||
      !formData.value.isTermsAgreed ||
      !isMinPasswordLength.value
    )
  } else {
    return !isMinPasswordLength.value
  }
})
</script>

<style lang="scss" scoped></style>
