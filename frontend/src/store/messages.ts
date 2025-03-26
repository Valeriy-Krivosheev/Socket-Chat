import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import axios from '@/axios'
import type { IMessage } from '@/type'

export const useMessageStore = defineStore('messages', () => {
  const messages: Ref<IMessage[]> = ref([])
  const getMessages = async () => {
    const response = await axios.get('messages')
    messages.value = response.data
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
  }
})
