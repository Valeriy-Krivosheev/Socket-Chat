<template>
  <div
    class="max-w-[800px] min-w-2/5 mx-auto rounded-lg bg-gray-100 dark:bg-gray-800 h-full flex flex-col p-4 relative"
    v-if="user"
  >
    <div class="flex items-center gap-4 absolute right-4 top-4">
      <img class="w-8 h-8 rounded-full" src="/img/ava.jpeg" alt="" />
      <div class="font-medium dark:text-white">
        <div class="text-sm">{{ user.name }}</div>
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
  <h1 v-else>Нет пользователя</h1>
</template>

<script setup lang="ts">
import ChatMessageItem from '@/components/ChatMessageItem.vue'
import ChatForm from '@/components/ChatForm.vue'
import { useUserStore } from '@/store/user'
import { ref, onMounted, onUpdated } from 'vue'
import { io } from 'socket.io-client'
import { storeToRefs } from 'pinia'
import type { IMessage } from '@/type.ts'
import type { Ref } from 'vue'
import useTime from '@/composables/useTime'
import useAxios from '@/composables/useAxios'

const { getMessages, addMessage } = useAxios()

const socket = io('http://localhost:5000')
const messages: Ref<IMessage[]> = ref([])

const store = useUserStore()
const { user } = storeToRefs(store)

const messageSend = async (msg: IMessage) => {
  socket.emit('sendMessage', msg)
  await addMessage(msg)
}
const chatContainer = ref<HTMLElement | null>(null)
const scrollToBottom = (elem: Ref<HTMLElement | null>) => {
  if (elem.value) {
    elem.value.scrollTop = elem.value.scrollHeight
  }
}

const receivedNewMsg = (): void => {
  socket.on('newMessage', (message: IMessage) => {
    messages.value.push(message)
  })
}
const { localDateWithoutMs } = useTime()

onMounted(async () => {
  socket.emit('userConnect', user.value)
  messages.value = await getMessages()
  receivedNewMsg()
})
onUpdated(() => {
  scrollToBottom(chatContainer)
})
</script>

<style scoped></style>
