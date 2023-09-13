<template>
    <div>
        <h1>Product List</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                <h2>{{ product.title }}</h2>
                <p>Price: ${{ product.price }}</p>
                <p>Category: {{ product.category }}</p>
                <p>Description: {{ product.description }}</p>
                <img :src="product.image" alt="Product Image" width="100" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const products = ref([]);

const fetchProducts = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchProducts();
});
</script>
