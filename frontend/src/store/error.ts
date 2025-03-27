import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import type { IError } from '@/type'

export const useErrorStore = defineStore('error', () => {
  const isError = ref(false)
  const errorMsg: Ref<IError[]> = ref([])
  const addErrorMsg = (msg: IError): void => {
    isError.value = true
    errorMsg.value.push(msg)
    removeErrorMsg(msg, 5000)
  }

  const removeErrorMsg = (msg: IError, timeMs: number): void => {
    setTimeout(() => {
      errorMsg.value = errorMsg.value.filter((item) => item.id !== msg.id)

      if (!errorMsg.value.length) isError.value = false
    }, timeMs)
  }
  return {
    isError,
    errorMsg,
    addErrorMsg,
  }
})
