<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <strong>{{ message.user }}:</strong> {{ message.text }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

export default {
  setup() {
    const socket = io('http://localhost:3000');
    const messages = ref([]);
    const newMessage = ref('');

    const sendMessage = () => {
      if (newMessage.value.trim()) {
        socket.emit('sendMessage', {  user: 'You', text: newMessage.value });
        newMessage.value = '';
      }
    };

    onMounted(() => {
      socket.on('newMessage', (message) => {
        messages.value.push(message);
      });
    });

    return { messages, newMessage, sendMessage };
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.messages {
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}
.message {
  margin-bottom: 8px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
