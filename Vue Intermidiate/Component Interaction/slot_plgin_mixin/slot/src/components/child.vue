<script setup lang='js'>
const message="fdf"
</script>
<template>
    <slot  :message="message"></slot>
   <div>
          <!-- Named slot header -->
          <slot name="header" :text="message"></slot>

          <!-- Default slot -->
          <slot :message="message"></slot>

          <!-- Named slot footer -->
          <slot name="footer"></slot>
        </div>
</template>
<style scoped></style>