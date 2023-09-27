<script setup lang='js'>
import grandchild from './greatchild.vue'
defineProps({
    msg: String,
})
</script>
<template>
    <h1>inside child</h1>
    <grandchild :msg="msg"></grandchild>  
</template>
<style scoped></style>