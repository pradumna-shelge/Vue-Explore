<script setup>
import ComponentA from './components/ComponentA.vue';
import ComponentBVue from './components/ComponentB.vue';


</script>
<template>

  <ComponentA></ComponentA>
  <ComponentBVue></ComponentBVue>


</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
