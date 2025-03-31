<template>
  <Loading v-if="isProfileLoading" />
  <div
    class="lg:max-w-[800px] lg:min-w-2/5 max-w-none w-full mx-auto rounded-lg flex flex-col lg:px-4 relative pb-10 h-full"
    v-if="user && !isProfileLoading"
  >
    <Header :user="user" />
    <h1 class="text-center text-2xl font-bold mb-4 dark:text-white">MyChat</h1>
    <h3 class="text-center text-gray-500 font-medium">Start your chatting with strangers here</h3>
    <div
      ref="chatContainer"
      class="h-150 max-h-[calc(100vh-6.25rem)] overflow-auto flex-1 flex flex-col"
    >
      <Loading v-if="isMessageLoading && !messages?.length" />
      <div v-else class="p-2 flex-1">
        <ChatMessageItem v-for="(message, i) in messages" :message="message" :key="i" />
      </div>
      <ChatForm @sendMessage="messageSend" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatMessageItem from '@/components/ChatMessageItem.vue'
import Header from '@/components/TheHeader.vue'
import ChatForm from '@/components/ChatForm.vue'
import Loading from '@/components/TheLoading.vue'
import { useUserStore } from '@/store/user'
import { useMessageStore } from '@/store/messages'
import { ref, onMounted, onUpdated } from 'vue'
import { io } from 'socket.io-client'
import { storeToRefs } from 'pinia'
import type { IMessage } from '@/type.ts'
import type { Ref } from 'vue'

const socket = io('http://localhost:5000')

const userStore = useUserStore()
const messageStore = useMessageStore()
const { user, isProfileLoading } = storeToRefs(userStore)
const { messages, isMessageLoading } = storeToRefs(messageStore)

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
