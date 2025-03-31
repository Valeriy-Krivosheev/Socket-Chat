<template>
  <header class="flex justify-between py-3 px-2" v-if="user">
    <button
      id="theme-toggle"
      type="button"
      class="self-baseline cursor-pointer rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      @click="toggleTheme"
    >
      <svg
        id="theme-toggle-dark-icon"
        ref="themeToggleDarkIcon"
        class="hidden h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg
        id="theme-toggle-light-icon"
        ref="themeToggleLightIcon"
        class="hidden h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <div>
      <div class="font-medium dark:text-white flex justify-start items-center mb-1">
        <img class="w-8 h-8 rounded-full mr-2" src="/img/ava.jpeg" alt="" />
        <div class="text-sm mr-2">{{ user.username }}</div>
        <ProfileDropdown />
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Joined {{ localDateWithoutMs(user.timeEntering) }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import { onMounted, PropType, ref } from 'vue'
import type { IUserCreated } from '@/type'
import useTime from '@/composables/useTime'

const { localDateWithoutMs } = useTime()
defineProps({
  user: {
    type: Object as PropType<IUserCreated>,
  },
})

const themeToggleDarkIcon = ref<HTMLElement | null>(null)
const themeToggleLightIcon = ref<HTMLElement | null>(null)
const setDarkTheme = () => {
  document.documentElement.classList.add('dark')
  localStorage.setItem('color-theme', 'dark')
  themeToggleLightIcon.value?.classList.remove('hidden')
  themeToggleDarkIcon.value?.classList.add('hidden')
}
const setLightTheme = () => {
  document.documentElement.classList.remove('dark')
  localStorage.setItem('color-theme', 'light')
  themeToggleLightIcon.value?.classList.add('hidden')
  themeToggleDarkIcon.value?.classList.remove('hidden')
}
const toggleTheme = () => {
  themeToggleDarkIcon.value?.classList.toggle('hidden')
  themeToggleLightIcon.value?.classList.toggle('hidden')

  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'dark') {
      setLightTheme()
    } else {
      setDarkTheme()
    }
  } else {
    if (document.documentElement.classList.contains('dark')) {
      setLightTheme()
    } else {
      setDarkTheme()
    }
  }
}
const initializeTheme = () => {
  const isDarkFromLocalStorage = localStorage.getItem('color-theme') === 'dark'
  const mySystemPreferenceIs = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  if (
    isDarkFromLocalStorage ||
    (!('color-theme' in localStorage) && mySystemPreferenceIs === 'dark')
  ) {
    setDarkTheme()
  } else {
    setLightTheme()
  }
}
onMounted(() => {
  initializeTheme()
})
</script>

<style scoped></style>
