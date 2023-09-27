    <script setup lang='js'>
    import child from './child.vue'
    import { defineComponent, ref } from 'vue';
    const clickMe=()=>{
        alert("")
    }


    </script>
    <template>
        <button @click="clickMe">button in parent</button>
        <child >
            
            <!-- Default slot -->
            <template v-slot:header="headerProps">
                    <button @click="clickMe">button in parent</button>

                <h2>{{ headerProps.text }}</h2>
            </template>
            <!-- Named slot -->
            <template v-slot:footer>
                <p>Footer content</p>
            </template>
            <!-- Scoped slot -->
            <template v-slot:default="slotProps">
                <p>Parent Component</p>
                <p>Message from Child Component: {{ slotProps.message }}</p>
            </template>
        </child>
    ------------------------------------------------------------------

      
    </template>
    <style scoped></style>