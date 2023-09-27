<script setup>
import {provide,ref} from 'vue'
import HelloWorld from './components/HelloWorld.vue';
const msg = ref(0)  
provide('msgr', msg)
const inc=()=>{  
  msg.value++
}
</script>  

<template>  
  <HelloWorld msg="Vite + Vue"/>  
  <button @click="inc"></button>
</template>
<style scoped>    
.logo {    
  height: 6em;  
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}  
.logo:hover {  
  filter: drop-shadow(0 0 2em  #646cffaa);
}      
  .logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}      
</style>    
    