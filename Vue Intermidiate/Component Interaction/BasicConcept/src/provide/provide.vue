<template>
    <div>
        <p>Parent Component</p>
        <button @click="updateSharedData">Update Shared Data</button>
        <ChildComponent />
    </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import ChildComponent from './provideChild.vue';

const sharedData = ref('Initial Shared Data');

const updateSharedData = () => {
    sharedData.value = 'Updated Shared Data';
};

provide('sharedData', sharedData);
</script>
