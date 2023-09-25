
<template>
    <p>Received message in Component B: {{ receivedMessage }}</p>
</template>

<script setup>
import eventBus from './EventBus';
import { ref, watch } from 'vue';

const receivedMessage = ref('');

watch(() => {
    receivedMessage.value = eventBus.value.message;
});
</script>
