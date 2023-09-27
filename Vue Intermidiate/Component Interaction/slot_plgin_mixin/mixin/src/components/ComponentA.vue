<template>
    <div>
        <p>Count: {{ count }}</p>
        <button @click="increment">Increment</button>
    </div>
</template>

<script setup>
import { useCounter } from '../mixins/mymixin';

const { count, increment } = useCounter();
</script>
