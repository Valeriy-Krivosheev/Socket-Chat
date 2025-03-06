<template>
  <div
    class="max-w-[800px] mx-auto rounded-lg bg-gray-100 dark:bg-gray-800 h-full flex flex-col p-4"
  >
    <h1 class="text-center text-2xl font-bold my-4">MyChat</h1>
    <div ref="chatContainer" class="h-150 max-h-[calc(100vh-6.25rem)] overflow-auto flex-1">
      <h3 class="text-center text-gray-500 font-medium">Start your chatting with strangers here</h3>
      <ChatMessageList :messages="messages" />
    </div>
    <ChatForm @sendMessage="messageSend" />
  </div>
</template>

<script setup lang="ts">
import ChatMessageList from '@/components/ChatMessageList.vue'
import ChatForm from '@/components/ChatForm.vue'
import { ref, onMounted, nextTick } from 'vue'
import { io } from 'socket.io-client'
import type { IMessage } from '@/type.ts'
import type { Ref } from 'vue'

const socket = io('http://localhost:3000')
const messages: Ref<IMessage[]> = ref([])

const messageSend = (text: string) => {
  const msg: IMessage = {
    text,
    user: 'You',
  }
  socket.emit('sendMessage', msg)
}
const chatContainer = ref<HTMLElement | null>(null)
const scrollToBottom = (elem: Ref<HTMLElement | null>) => {
  if (elem.value) {
    elem.value.scrollTop = elem.value.scrollHeight
  }
}

onMounted(() => {
  socket.on('newMessage', (message: IMessage) => {
    messages.value.push(message)
    nextTick(() => {
      scrollToBottom(chatContainer)
    })
  })
})
</script>

<style scoped></style>
