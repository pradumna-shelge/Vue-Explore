<script setup lang='js'>
import router from '../Router'
import { loginUser } from '../Services/islogin.js'
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { CustomValidationMsg } from '.././Vadidators/index'

import { email, minLength, required } from '@vuelidate/validators';

const emits = defineEmits();
let formData = reactive({
    username: '',
    password: '',
   
});
const rules = computed(() => {
    return {
        username: { required },
        password: { required },
       

    };
});

const $v = useVuelidate(rules, formData);
const signIn = async () => {

    try {
        var d = await $v.value.$validate()
        await loginUser(formData.username, formData.password);
          emits('login-success');
       
       
    } catch (error) {
        console.error('Error:', error);
        
    }
};
</script>


<template>
    <section class="">
      <div class="flex flex-col items-center justify-center px-6  mx-auto  lg:py-0">
         
          <div class="w-full bg-sky-50 hover:bg-cyan-100 hover:border-2 hover:shadow-xl rounded-lg border  md:mt-0 sm:max-w-md xl:p-0  ">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  
                  
                  <!-- <img  src="https://aws-day1-practice4.s3.ap-south-1.amazonaws.com/ad837b1a-d5fc-4510-80ec-aebca035811b?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA33GSIZ3RZDCIZDSK%2F20230918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230918T100114Z&X-Amz-SignedHeaders=host&X-Amz-Signature=94ff3f8328abe100f845bcf486114d045e20f11b066cea6b6d982922a2397c0e" class=" mx-32 logo" alt="ShopNest Logo"> -->
                  <h1 class=" text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in 
                  </h1>
                  <form class="space-y-4 md:space-y-6" @submit.prevent="signIn">
                      <div>
                    <!-- <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label> -->
                    <input v-model="formData.username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg -gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username">
                    <span class="text-red-400" v-for="error in $v.username.$errors">{{ CustomValidationMsg(error.$message, "Username") }}</span>
                  </div>
                     <div>
                    <!-- <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> -->
                    <input v-model="formData.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg -gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password">
                    <span class="text-red-400" v-for="error in $v.password.$errors">{{ CustomValidationMsg(error.$message, "Password") }}</span>
                  </div>
                     
                      <button  type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <a class="font-medium text-primary-600 hover:underline dark:text-primary-500"> <router-link to="/signup" >Sign up</router-link> </a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
</template>



<style scoped>
</style>