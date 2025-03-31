import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import axios from '@/axios'
import type { IMessage } from '@/type'

export const useMessageStore = defineStore('messages', () => {
  const messages: Ref<IMessage[]> = ref([])
  const isMessageLoading = ref(false)
  const getMessages = async () => {
    isMessageLoading.value = true
    const response = await axios.get('messages')
    messages.value = response.data
    isMessageLoading.value = false
  }

  const postMessages = async (msg: IMessage) => {
    return await axios.post('messages', msg)
  }

  const addMessage = (msg: IMessage): void => {
    messages.value.push(msg)
  }

  return {
    messages,
    getMessages,
    postMessages,
    addMessage,
    isMessageLoading,
  }
})
