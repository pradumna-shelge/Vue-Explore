<template>
    <div>
        <button @click="toggleComponent">Toggle Component</button>
        <component :is="currentComponent"></component>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ComponentA from './DA.vue';
import ComponentB from './DB.vue';

const currentComponent = ref('ComponentA');

const toggleComponent = () => {
    currentComponent.value = currentComponent.value === 'ComponentA' ? 'ComponentB' : 'ComponentA';
};  
</script>
