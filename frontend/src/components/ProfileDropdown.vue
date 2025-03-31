<template>
  <button
    id="dropdownMenuIconButton"
    data-dropdown-toggle="dropdownDots"
    class="cursor-pointer inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    type="button"
  >
    <svg
      class="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 4 15"
    >
      <path
        d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
    </svg>
  </button>

  <div
    id="dropdownDots"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
  >
    <ul
      class="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownMenuIconButton"
    >
      <li>
        <a
          href="#"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >Go to profile</a
        >
      </li>
    </ul>
    <div class="py-2">
      <button
        @click="onLogout"
        class="cursor-pointer w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'
import router from '@/router'

const onLogout = async () => {
  localStorage.removeItem('chat-token')
  await router.push({ name: 'auth' })
}

onMounted(() => {
  initFlowbite()
})
</script>

<style scoped></style>
