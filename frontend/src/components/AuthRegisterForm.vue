<template>
  <form @submit.prevent="onSubmit" class="mx-auto bg-blue-100 p-10 rounded-lg">
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Your nickname</label
      >
      <input
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
    </div>
    <div v-if="type === 'registration'" class="flex items-start mb-5">
      <div class="flex items-center h-5">
        <input
          id="terms"
          type="checkbox"
          v-model="formData.isTermsAgreed"
          class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
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
      type="submit"
      class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <template v-if="type === 'registration'">Register new account</template>
      <template v-else>Log in</template>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
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
</script>

<style lang="scss" scoped></style>
