<script setup lang='js'>
import { productApi } from '../endpoints/index'
import spinner from './Loader.vue'

import { isLoggedIn } from '../services/userService'
import { ref, onMounted } from 'vue';
import { getProduct } from '../services/productService'
import router from '../routers'

const products = ref([]);
const productsTemp = ref([]);
const { getData, apiData, apiError } = getProduct();
const url = ref(productApi);
const flag = ref(true)
const getProductsData = async () => {
  flag.value = true
  await getData(url.value).then(() => {
    flag.value = false
  });
  console.log(apiData);
  products.value = apiData.value
  productsTemp.value = apiData.value

};
const addTocart = () => {
  if (!isLoggedIn) {
    router.push({ path: 'login' })
  } else {
    
  }
}

const search = (key) => {
  console.log(key);
  products.value = productsTemp.value.filter((a) => (a.productName.toLowerCase().match(key.toLowerCase()) || (a.description.toLowerCase().match(key.toLowerCase()))));
}

onMounted(() => {
  getProductsData();
});
</script>



<template>
  <spinner :flag="flag"></spinner>
  <div class="mb-10 flex justify-center">
    <form class="w-full max-w-md">
      <label for="default-search" class="sr-only">Search Products</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20" aria-label="Search Icon">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
          </svg>
        </div>
        <input @input="search($event.target.value)" type="search" id="default-search"
          class="w-full py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500"
          placeholder="Search here..." required />
      </div>
    </form>
  </div>

  <div class="flex flex-wrap justify-start gap-32  mx-10">

    <div class="  " v-if="products" v-for="(p, index) in products" :key="index">

      <div
        class="min-w-52 p-2 shadow-xl  relative  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl justify-content-center" href="#">
          <img class="object-cover" :src="p.productImage" alt="product image" />
        </a>
        <div class="mt-4 px-5 pb-5">
          <a href="#">
            <h5 class="text-xl tracking-tight text-slate-900">{{ p.productName }}</h5>
          </a>
          <a href="#">
            <p class="text-sm  text-black-300">{{ p.description }}</p>
          </a>
          <div class="mt-2 mb-5 flex items-end justify-end">
            <p>
              <span class="text-3xl  font-bold text-slate-900">${{ p.price }}</span>
              <span class="text-sm text-slate-900 line-through">${{ p.price + 100 }}</span>
            </p>
          
          </div>
          <a @click="addTocart"
            class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart</a>
        </div>
      </div>


    </div>
  </div>
</template>



<style scoped></style>