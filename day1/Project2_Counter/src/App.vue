<script setup lang="ts">
// import couter from './components/Counter.vue'
import { ref } from 'vue';
import Vbininding from './components/Vbininding.vue';
import Vmodal from './components/Vmodal.vue';
let user = ref('sfdsf');
const fun = ()=>{ user.value="new name"}
</script>

<template>

<Vbininding></Vbininding>
<Vmodal :user="user" @emit="fun"></Vmodal>
</template>

<style scoped>

</style>
