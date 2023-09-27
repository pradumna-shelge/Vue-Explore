<script setup lang='js'>
import { userApi, loginApi,productApi } from '../Endpoints/ApiLinks'
import spinner from './Admin/spinner.vue'

import { isLogin } from '../Services/islogin.js'
import { ref, onMounted } from 'vue';
import {getApiData} from '../Services/products'
import router from '../Router'

const products = ref([]);
const productsTemp = ref([]);
const { getData, data, error } = getApiData();
const url = ref(productApi);
const flag = ref(true)
const asyncFunction = async () => {
  flag.value = true
  await getData(url.value).then(()=>{
    flag.value=false
  });
  console.log(data);
  products.value = data.value
  productsTemp.value = data.value

};
const addTocart=()=>{
if(!isLogin){
    router.push({path:'login'})
}
 
}

const search=(key)=>{
  console.log(key);
  key = key.trim();
  key = key.split("  ").join(" ")
  products.value = productsTemp.value.filter((a) => (a.productName.toLowerCase().match(key.toLowerCase())||( a.description.toLowerCase().match(key.toLowerCase()))));
}

onMounted(() => {
  
  asyncFunction();
});
const img="data:image/jpeg;base64,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"
</script>



<template>
  <spinner :flag="flag"></spinner>
  <div class="mb-10 flex justify-center">
    <form class="w-full max-w-md">
      <label for="default-search" class="sr-only">Search Products</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
         
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            aria-label="Search Icon"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            ></path>
          </svg>
        </div>
        <input
          @input="search($event.target.value)"
          type="search"
          id="default-search"
          class="w-full py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500"
          placeholder="Search here..."
          required
        />
      </div>
    </form>
  </div>

  <div class="flex flex-wrap justify-evenly gap-32  mx-10">
    <div class="  " v-if="products" v-for="(p, index) in products" :key="index">
      
     
      <div class="min-w-52 p-2 shadow-xl  relative  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-md">
        <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl justify-center ">
        <img class="object-cover" :src="p.productImage" alt="product image" />
      </a>
      
      <div class="mt-4 px-2 pb-2">
        <a >
          <h5 class="text-xl tracking-tight text-slate-900">{{p.productName }}</h5>
        </a>
        <a >
            <p class="text-sm  text-black-300">{{ p.description  }}</p>
          </a>
        <div class="mt-2 mb-5 flex items-end justify-end">
          <p>
            <span class="text-2xl  font-bold text-slate-900">${{p.price }}</span>
            <span class="text-sm text-red-600 text-slate-900 line-through">${{p.price +100}}</span>
          </p>
          <!-- <div class="flex items-center">
            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
          </div> -->
        </div>
        <a  class="flex items-center justify-center rounded-md bg-rose-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">

             <router-link :to="{ name: 'product', params: { nameOfProduct: p.productName } }">
           View Product
          </router-link></a
        >
      </div>
    </div>
  
  
  </div>
</div>



   
</template>



<style scoped>
</style>