<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import useUser from '@/composables/useUser'
import type { IUserCreated } from '@/type'

const { saveUser } = useUser()

onMounted(() => {
  initFlowbite()
})
const addUser = (newUser: IUserCreated) => {
  saveUser(newUser)
}
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
