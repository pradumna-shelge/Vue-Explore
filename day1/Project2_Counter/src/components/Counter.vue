<template>
    <div>
        <button @click="decrement">-</button>
        <p>Count: {{ count }}</p>
        <button @click="increment">+</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const count = ref(0);


const increment = () => {
    count.value++;
};

const decrement = () => {
    count.value--;
};
</script>

<style scoped>

</style>

