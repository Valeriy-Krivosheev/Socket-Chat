<template>
  <div
    v-if="loading"
    class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-full h-full"
  >
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div
    class="max-w-[800px] min-w-2/5 mx-auto rounded-lg bg-gray-100 dark:bg-gray-800 h-full flex flex-col p-4 relative"
    v-if="user && !loading"
  >
    <div class="flex items-center gap-4 absolute right-4 top-4">
      <img class="w-8 h-8 rounded-full" src="/img/ava.jpeg" alt="" />
      <div class="font-medium dark:text-white">
        <div class="text-sm">{{ user.username }}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">
          Joined {{ localDateWithoutMs(user.timeEntering) }}
        </div>
      </div>
    </div>

    <h1 class="text-center text-2xl font-bold mb-4 mt-8">MyChat</h1>
    <div ref="chatContainer" class="h-150 max-h-[calc(100vh-6.25rem)] overflow-auto flex-1">
      <h3 class="text-center text-gray-500 font-medium">Start your chatting with strangers here</h3>
      <div v-if="messages?.length" class="p-2">
        <ChatMessageItem v-for="(message, i) in messages" :message="message" :key="i" />
      </div>
    </div>
    <ChatForm @sendMessage="messageSend" />
  </div>
</template>

<script setup lang="ts">
import ChatMessageItem from '@/components/ChatMessageItem.vue'
import ChatForm from '@/components/ChatForm.vue'
import { useUserStore } from '@/store/user'
import { useMessageStore } from '@/store/messages'
import { ref, onMounted, onUpdated } from 'vue'
import { io } from 'socket.io-client'
import { storeToRefs } from 'pinia'
import type { IMessage } from '@/type.ts'
import type { Ref } from 'vue'
import useTime from '@/composables/useTime'

const socket = io('http://localhost:5000')

const userStore = useUserStore()
const messageStore = useMessageStore()
const { user, loading } = storeToRefs(userStore)
const { messages } = storeToRefs(messageStore)

const messageSend = async (msg: IMessage) => {
  socket.emit('sendMessage', msg)
  await messageStore.postMessages(msg)
}
const chatContainer = ref<HTMLElement | null>(null)
const scrollToBottom = (elem: Ref<HTMLElement | null>) => {
  if (elem.value) {
    elem.value.scrollTop = elem.value.scrollHeight
  }
}

const receivedNewMsg = (): void => {
  socket.on('newMessage', (message: IMessage) => {
    messageStore.addMessage(message)
  })
}
const { localDateWithoutMs } = useTime()

onMounted(async () => {
  await userStore.checkAuth()
  socket.emit('userConnect', user.value)
  await messageStore.getMessages()
  receivedNewMsg()
})
onUpdated(() => {
  scrollToBottom(chatContainer)
})
</script>

<style scoped></style>
