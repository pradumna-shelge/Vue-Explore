<template>
    <div>
        
        <img v-bind:src="user.avatarUrl" alt="User Avatar" />
        <h2>{{ user.name }}</h2>
        <p>{{ user.bio }}</p>
        
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
     user: {
                name: 'John Doe',
                bio: 'A software developer',
                avatarUrl: 'path/to/user-avatar.jpg',
            },};
  },
});
</script>
