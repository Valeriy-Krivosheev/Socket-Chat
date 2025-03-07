<template>
  <div
    class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-gray-300"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div class="p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
            Welcome to our chat
          </h2>
          <h3 class="text-l font-semibold text-gray-900 dark:text-white text-center">
            Please introduce yourself
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <form class="space-y-4" @submit.prevent="addUser">
            <div class="mb-6">
              <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your nickname</label
              >
              <input
                type="text"
                name="text"
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ivan Petrov"
                required
                v-model="newUserName"
              />
            </div>
            <button
              type="submit"
              class="cursor-pointer w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IUserCreated } from '@/type.ts'

const emit = defineEmits<{
  (e: 'addUser', user: IUserCreated): void
}>()

const newUserName = ref<string>('')

const addUser = () => {
  if (!newUserName.value.trim()) return
  emit('addUser', {
    name: newUserName.value,
    timeEntering: Date.now(),
  })
}
</script>

<style scoped></style>
