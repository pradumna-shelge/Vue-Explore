
<template>
  <div>
    
    <router-link to="/">Home</router-link>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
