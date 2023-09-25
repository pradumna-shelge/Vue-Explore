<template>
    <div>
        <p>Child Component</p>
        <p>Received Shared Data: {{ receivedData }}</p>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';

const receivedData = inject('sharedData', ref('Default Value'));
</script>
