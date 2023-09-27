

<script setup lang="js">
import { ref, reactive,computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import  {CustomValidationMsg} from '.././Vadidators/index'
import { email, minLength, required } from '@vuelidate/validators';
import { isLogin, setUserInfo, loginUser,AddUser } from '../Services/islogin.js'
let formData = reactive({
    username: '',
    password: '',
    email: '',
});

const rules = computed(() => {
    return {
       username: { required },
        password: { required },
        email: { required, email },

    };
});
const $v = useVuelidate(rules, formData);

async function signUp() {
      var d = await $v.value.$validate()

    if (d) {
        
         await AddUser(formData.username, formData.email, formData.password);
    }
}
</script>

<template>
    <section>
         <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
        <div class="w-full bg-gray-50 hover:bg-gray-100 hover:border-2 hover:shadow-xl rounded-lg border  md:mt-0 sm:max-w-md xl:p-0  ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class=" text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="signUp">
              <div>
                <!-- <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label> -->
                <input v-model="formData.username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg -gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username">
                <span class="text-red-400 text-xs text-end text-right" v-for="error in $v.username.$errors">{{ CustomValidationMsg(error.$message,"Username")  }}</span>
              </div>
              <div>
                <!-- <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> -->
                <input v-model="formData.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg -gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password">
                <span class="text-red-400 text-xs text-end text-right" v-for="error in $v.password.$errors">{{ CustomValidationMsg(error.$message, "Password")  }}</span>
              </div>
              <div>
                <!-- <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label> -->
                <input v-model="formData.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg -gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email address">
                <span class="text-red-400 text-xs text-end text-right" v-for="error in $v.email.$errors">{{ CustomValidationMsg(error.$message, "Email address")  }}</span>
              </div>
              <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
    Already have an account? <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" ><router-link to="/login" >Log in</router-link></a>
  </p>

            </form>
          </div>
        </div>
      </div>
    </section>
</template>

