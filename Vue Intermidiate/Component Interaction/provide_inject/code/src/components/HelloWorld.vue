<script setup>
import { ref,inject } from 'vue'
import child from './child.vue';
defineProps({
  msg: String,
})
const count = inject('msgr', 0);

</script>

<template>
  <h1>{{ msg }}</h1>
<h1>{{ count }}</h1>
<child :msg="msg" ></child>
</template>

<style scoped>                                                                      
.read-the-docs {
  color: #888;
}
</style>
