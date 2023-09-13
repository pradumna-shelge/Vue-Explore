<template>
    <div>
      
        <input v-model="userName" type="text" placeholder="Enter your name" />
        <p>Hello, {{ userName }}!</p>
        <h1>{{ onj.age }}</h1>
        <h1>{{ user }}</h1>
        <button @click=" sendMessageToParent ">click</button>
    </div>
</template>

<script lang="ts" setup>
 defineProps(['user'])
const emits = defineEmits();
import { reactive, ref } from 'vue';
const sendMessageToParent = () => {
    emits('emit');
};

 const userName = ref('');
 const onj = reactive({name :"",age:22})
</script>
