<template>
  <Transition>
    <div v-if="isError" class="fixed right-2 top-2 z-99">
      <div
        v-for="(item, i) in errorMsg"
        :key="i"
        :id="`toast-danger${i}`"
        class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 min-w-50"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
            />
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">{{ item.text }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'
import { useErrorStore } from '@/store/error'
import { storeToRefs } from 'pinia'
const errorStore = useErrorStore()

const { errorMsg, isError } = storeToRefs(errorStore)

onMounted(() => {
  initFlowbite()
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
