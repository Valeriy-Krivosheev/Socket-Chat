<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useUserStore } from '@/store/user'

const store = useUserStore()

onMounted(async () => {
  initFlowbite()
  await store.checkAuth()
})
</script>

<template>
  <div class="h-full bg-gray-50 dark:bg-gray-700 flex flex-col">
    <main class="flex flex-col items-center justify-center flex-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style scoped></style>
