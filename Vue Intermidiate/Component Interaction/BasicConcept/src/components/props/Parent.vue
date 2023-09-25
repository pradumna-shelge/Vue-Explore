<script setup lang="js">
import { ref } from 'vue';
import Child from './child.vue';

const data = ref('hello world');

const updateMessage = () => {
    data.value = 'New Message';
};
</script>

<template>
    <Child :massage="data" @update-data="updateMessage" />
</template>

<style scoped></style>
