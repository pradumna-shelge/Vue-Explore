<template>
                        
                         <p>{{ BindingVariable }}</p>
                         <h1>Binding Attribute</h1>
                         <img :src="BindingAttribute" alt="image">
                         <h1>BInding Raw html</h1>
                         <span v-html="BindingHtml"></span>

                         <h1>Binding Multiple attributes</h1>
                         <p v-bind="BindingMultipleAttribute">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, voluptatibus.</p>

                         <h1>if else condition</h1>
                         <button @click="chageFlag">Click ME</button>
                         <p v-if="conditionFlag">True condition</p>

                         <h1>Reactive binding</h1>
                         <p>name:{{ obj.name }}</p>
                         <p>name:{{ obj.age }}</p>


                         <h1>class Binding</h1>
                         <p :class="{'text-red-500': conditionFlag }">
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto tenetur nemo alias reprehenderit, explicabo voluptas facere maxime praesentium quo placeat?
                         </p>

                         <h1>Conditional Rendering</h1>
                         <button @click="awesome = !awesome">Toggle</button>
                         
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>
    <h1>List Rendering</h1>
        <li v-for="({ message }, index) in items">
        {{ index }}  {{ message }}
        </li>


        <h1>v-for with an Object</h1>
        <li v-for="(value, key) in myObject">
      {{ key }}: {{ value }}
    </li>

    <span v-for="n in 10">{{ n }}</span>
</template>
    <script setup lang='ts'>
    import { ref, reactive } from 'vue';
    const BindingVariable = ref()
    BindingVariable.value = "binding value";

    const BindingAttribute = ref();
    BindingAttribute.value = "https://cdn-img1.imgworlds.com/assets/a5366382-0c26-4726-9873-45d69d24f819.jpg?key=home-gallery";

    const BindingHtml = ref();
    BindingHtml.value = `<span style="color: red">This should be red.</span>`

    const BindingMultipleAttribute = ref();

   BindingMultipleAttribute.value= {
        id: 'container',
        class: 'bg-red-300 p-2'
    }

    const conditionFlag = ref();
    conditionFlag.value = true;

     const obj = reactive({name:"pradumna",age:22})

     

    const chageFlag=()=>{
        conditionFlag.value = !conditionFlag.value;
    };

    const awesome = ref(true)
    const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
    const myObject = reactive({
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
    })
    
    </script>
<style scoped>
</style>