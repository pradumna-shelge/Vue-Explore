<script setup lang='ts'>
import { ref } from 'vue';
const message = ref();
const checkedNames = ref([])
</script>


<template>
    <h2>Input data binding</h2>
    <p>Message is: {{ message }}</p>
    <input v-model="message" placeholder="edit me" />


    <div>Checked names: {{ checkedNames }}</div>

    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>

    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>

    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
</template>
