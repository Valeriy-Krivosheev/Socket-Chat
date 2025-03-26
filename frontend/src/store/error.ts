import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const isError = ref(false)
  const errorMsg: Ref<string[]> = ref([])
  const addErrorMsg = (msg: string): void => {
    isError.value = true
    errorMsg.value.push(msg)
  }
  return {
    isError,
    errorMsg,
    addErrorMsg,
  }
})
