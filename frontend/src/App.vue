<script setup lang="ts">
import Chat from '@/components/Chat.vue'
import IntroduceModal from '@/components/IntroduceModal.vue'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useUser } from '@/composables/useUser.ts'

const { user, saveUser } = useUser()

onMounted(() => {
  initFlowbite()
})
const addUser = (newUser) => {
  saveUser(newUser)
}
</script>

<template>
  <div class="h-full bg-gray-50 dark:bg-gray-700">
    <Chat v-if="user?.name" />
    <IntroduceModal @add-user="addUser" v-else />
  </div>
</template>

<style scoped></style>
