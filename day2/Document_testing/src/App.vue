<script setup lang="ts">
import EvenHandling from './components/evenHandling.vue';
import InputsForms from './components/inputs&Forms.vue';
import TempletSysntax from './components/templetSysntax.vue';


</script>

<template>

<TempletSysntax v-if="false"></TempletSysntax>
<EvenHandling v-if="false"></EvenHandling>
<InputsForms></InputsForms>

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
