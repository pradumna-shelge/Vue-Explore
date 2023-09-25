<script setup lang='js'>
const {flag, openModalFlag }=defineProps(['openModalFlag', 'flag'])
import { ref, reactive, computed } from 'vue';

const flagTemp = ref(true);
import logo from '../assets/logo.png'

const closeModal=()=>{
   document.getElementById('modal').style.display="none"
}

</script>


<template>
<div  class="modal " id="modal" style="display: none;">
              <div class="modal-content rounded-xl text-start ">
                     <span @click="closeModal" class="hover:cursor-pointer text-rose-500" style="float:right;">&times;</span>
           
                     <div class="my-10">
                      <div class="flex justify-center ">

                        <h2 class=" text-2xl text-gray-800 mx-2">Welcome to </h2>
                        <span class=" mb-6 text-rose-500 flex justify-center text-2xl"> <img  :src="logo" class="mx-1 w-10 h-10" alt="ShopNest Logo">ShopNest</span>
                      </div>
                      <p class="text-md text-gray-700"> <span class="text-black">Last login: </span> {{ openModalFlag.lastLogin }}</p>
                       <p class="text-md text-gray-700"><span class="text-black">Login detail: </span>  {{ openModalFlag.loginPcno  }}</p>
                     </div>


              </div>
                    
                
            </div>
</template>


<style scoped>
</style>