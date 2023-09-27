<script setup lang="js">
 import { userApi, loginApi,productApi } from '../Endpoints/ApiLinks'
import spinner from './Admin/spinner.vue'
import { useRoute } from 'vue-router';
import { isLogin } from '../Services/islogin.js'
import { ref, onMounted } from 'vue';
import {getApiData} from '../Services/products'
import router from '../Router'
const route = useRoute();
const products = ref([]);
const product = ref();
const { getData, data, error } = getApiData();
const url = ref(productApi);
const flag = ref(true)
const asyncFunction = async () => {
    debugger;
      const productName =  route.params.nameOfProduct
  flag.value = true
  await getData(url.value).then(()=>{
    flag.value=false
  });
  console.log(data);
  products.value = data.value
 

  product.value = products.value.find(item => item.productName === productName)
  console.log(product.value)

};

const goback=()=>{
  router.go(-1)
}

onMounted(() => {
  
  asyncFunction();
});

</script>
<template v-show="false">
   
   
   <div @click="goback" class="mx-10 flex item-center text-xl">
       <a > <svg xmlns="http://www.w3.org/2000/svg" width="56" height="36" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
     <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
   </svg></a>
   Back
   </div>
    <div class="flex  justify-center  w-100 p-10">

        <div v-if="product && product.productName && product.productImage && product.description && product.price " class=" card flex     rounded shadow-xl flex  bg-gray-700 h-fit ">
          <div class="flex justify-center ">

           <img  class=" " :src="product.productImage">
           
          </div> 
              <div class=" p-10 mt-4  pb-5 text-white flex  flex-col justify-around text-center">
                <a >
                  <h5 class="text-3xl tracking-tight text-gray-200">{{ product.productName }}</h5>
                </a>
                <div class="mt-2 mb-5 flex items-end justify-center">
                  <p>
                    <span class="text-3xl  font-bold text-sky-400">${{ product.price }}</span>
                    <span class="text-md text-red-400 line-through">${{ product.price + 100 }}</span>
                  </p>
        
                </div>
                <a >
                    <p class="text-sm  text-gray-300">{{ product.description }}</p>
                  </a>
            
              </div>
            </div>
    </div>
</template>

<style scoped>
.card{
  min-width: 500px !important;
  max-width: 600px !important;
  min-height: 300px !important;
  max-height: 300px !important;
}
img{
  width: auto !important;
  height: 300px !important; 

}
</style>