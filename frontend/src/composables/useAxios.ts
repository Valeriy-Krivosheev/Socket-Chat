import axios from 'axios'
import type { IMessage } from '@/type'

const msg = 'http://localhost:5000/api/messages'

export default function useAxios() {
  const getMessages = async () => {
    try {
      const response = await axios.get(msg, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('chat-token')}`,
        },
      })
      return response.data
    } catch (error: unknown) {
      //todo доработать вывод ошибок
      console.error(error)
    }
  }

  const addMessage = async (message: IMessage) => {
    try {
      return axios.post(msg, message)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return {
    getMessages,
    addMessage,
  }
}
