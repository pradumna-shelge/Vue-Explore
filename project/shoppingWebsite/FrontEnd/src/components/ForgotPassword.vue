<script setup lang='js'>

import router from '../Router'
import { loginUser } from '../Services/islogin.js'
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { CustomValidationMsg } from '.././Vadidators/index'

import { email, minLength, required,sameAs } from '@vuelidate/validators';

const showForgotPasswordForm = ref(false);

const forgotPasswordFormData = reactive({
   
    username: '',
    newPassword: '',
    confirmPassword: '',
});


const forgotPasswordRules = computed(() => {
    return {
       
        username: { required },
        newPassword: { required },
        confirmPassword: {
            required,
            sameAsNewPassword: sameAs(forgotPasswordFormData.newPassword),
        },
    };
});

const $vForgotPassword = useVuelidate(forgotPasswordRules, forgotPasswordFormData);

const resetPassword = async () => {

    try {
        const valid = await $vForgotPassword.value.$validate();
        if (valid) {
            // Perform reset password logic here
            // ...
            alert("")
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
</script>
<template>

    <section class="mt-6">
        <div class="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
            <div
                class="w-full bg-gray-50 hover:bg-gray-100 hover:border-2 hover:shadow-xl rounded-lg border md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Reset Password
                    </h1>

                    <form class="space-y-4 md:space-y-6" @submit.prevent="resetPassword">
                        <!-- Username Field -->
                        <div>
                            <input type="text" v-model="forgotPasswordFormData.username" 
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your email">
                            <span class="text-red-400 text-xs block" v-for="error in $vForgotPassword.username.$errors" :key="error">
                                {{ CustomValidationMsg(error.$message, "Username"),error.$message }}
                            </span>
                        </div>

                        <!-- New Password Field -->
                        <div>
                            <input type="password" v-model="forgotPasswordFormData.newPassword" id="newPassword"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter new password">
                            <span class="text-red-400 text-xs block" v-for="error in $vForgotPassword.newPassword.$errors" :key="error">
                                {{ CustomValidationMsg(error.$message, "New Password") }}
                            </span>
                        </div>

                        <!-- Confirm Password Field -->
                        <div>
                            <input type="password" v-model="forgotPasswordFormData.confirmPassword" id="confirmPassword"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Confirm new password">
                            <span class="text-red-400 text-xs block" v-for="error in $vForgotPassword.confirmPassword.$errors"
                                :key="error">
                                {{ CustomValidationMsg(error.$message, "Confirm Password") }}
                            </span>
                        </div>

                        <button type="submit"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Reset Password
                        </button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                              Return to  <a class="font-medium text-primary-600 hover:underline dark:text-primary-500"> <router-link to="/signup" >login</router-link> </a>
                          </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>