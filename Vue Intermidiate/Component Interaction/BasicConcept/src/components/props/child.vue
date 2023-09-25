<!-- <script setup lang='js'>
const { massage } = defineProps(['massage']);
import { ref } from 'vue';
const emits = defineEmits()
const localMessage = ref(massage);
function updateMessage() {
    localMessage.value = 'New Message';
     emits("update-data")
}

</script>



<template>
    <div>
        <h1>{{ massage }}</h1>
            <h1>{{ localMessage }}</h1>
    </div>
        <button @click="updateMessage">Update Message</button>
</template>



<style scoped></style> -->



        <script setup>
        import { ref, defineProps, defineEmits } from 'vue';
        
        const { massage } = defineProps(['massage']);
        const emits = defineEmits();
        
        function updateMessage() {
            // Update the message and emit the "update-data" event
            emits("update-data");
        }
        </script>
<template>
    <div>
        <h1>{{ massage }}</h1>
        <button @click="updateMessage">Update Message</button>
    </div>
</template>


<style scoped></style>
