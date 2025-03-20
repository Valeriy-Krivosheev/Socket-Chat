<template>
  <div>
    <div v-if="message.type === 'message'" :class="messageWrapClasses">
      <img class="w-8 h-8 rounded-full" src="/img/ava.jpeg" alt="Profile picture" />
      <div :class="messageTextClasses">
        <div :class="userNameWrapClasses">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{{
            userName(message.user.name)
          }}</span>
        </div>
        <div
          class="leading-1.5 p-3 border-gray-200 bg-blue-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 w-fit min-w-20"
        >
          <p class="text-sm font-normal text-gray-900 dark:text-white">
            {{ message.content.text }}
          </p>
        </div>
        <span :class="messageTimeClasses"> {{ localDateWithoutMs(message.content.time) }}</span>
      </div>
    </div>
    <div class="text-center text-gray-500 text-sm" v-if="message.type === 'system'">
      {{ message.content.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMessage } from '@/type.ts'
import { computed, type PropType } from 'vue'
import { twMerge } from 'tailwind-merge'
import useTime from '@/composables/useTime'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
const store = useUserStore()
const { user } = storeToRefs(store)

const props = defineProps({
  message: {
    type: Object as PropType<IMessage>,
    required: true,
  },
})
const { localDateWithoutMs } = useTime()

const isCurrentUser = computed(() => {
  return props.message.user.id === user.value?.id
})

const userName = (name: string) => (isCurrentUser.value ? 'You' : name)

const messageWrapClasses = computed(() => {
  const defaultClasses = 'flex items-start gap-2.5 mb-4'
  return twMerge(defaultClasses, isCurrentUser.value ? 'flex-row-reverse' : '')
})

const messageTimeClasses = computed(() => {
  const defaultClasses = 'text-sm font-normal text-gray-500 dark:text-gray-400'
  return twMerge(defaultClasses, isCurrentUser.value ? 'text-right' : '')
})

const userNameWrapClasses = computed(() => {
  const defaultClasses = 'flex items-center space-x-2 rtl:space-x-reverse'
  return twMerge(defaultClasses, isCurrentUser.value ? 'justify-end' : '')
})
const messageTextClasses = computed(() => {
  const defaultClasses = 'flex flex-col gap-1 w-full max-w-8/10'
  return twMerge(defaultClasses, isCurrentUser.value ? 'items-end' : 'items-start')
})
</script>

<style lang="scss" scoped></style>
