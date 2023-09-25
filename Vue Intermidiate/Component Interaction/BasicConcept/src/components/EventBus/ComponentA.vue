
<template>
    <button @click="sendMessage">Send Message from A to B</button>
</template>

<script setup>
import eventBus from './EventBus';
const sendMessage = () => {
    eventBus.value.message = 'Hello from Component A';
}
</script>
