<template>
  <div>
    <div v-for="(message, i) in messages" :key="i" class="flex items-start gap-2.5 mt-4">
      <img class="w-8 h-8 rounded-full" src="/img/ava.jpeg" alt="Profile picture" />
      <div class="flex flex-col gap-1 w-full max-w-[320px]">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{{
            message.user.name
          }}</span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
        </div>
        <div
          class="flex flex-col leading-1.5 p-4 border-gray-200 bg-blue-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
        >
          <p class="text-sm font-normal text-gray-900 dark:text-white">{{ message.text }}</p>
        </div>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMessage } from '@/type.js'
import { type PropType } from 'vue'
// если name from localstorage === user.name
defineProps({
  messages: {
    type: Array as PropType<IMessage[]>,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
