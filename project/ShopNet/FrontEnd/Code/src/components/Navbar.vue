<script setup lang="js">
import { ref, onMounted } from 'vue';
import logo from '../assets/logo.png';
import router from '../routers';
import { loggedInUsername, setUserInfo,decodeUserInfo } from '../services/userService';
import { defineProps, defineEmits } from 'vue';

defineProps(['flag']);
const emits = defineEmits();

const logout = () => {
    console.log("navabr");
    localStorage.clear();
    emits('login-success1');
    router.push('/');
}

onMounted(() => {
   decodeUserInfo();
});
</script>

<template>
    <h1>Your Heading Here</h1>

    <nav class="p-3 bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
            <router-link to="/">
                <a class="flex items-center">
                    <img :src="logo" class="logo" alt="ShopNest Logo">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        <router-link to="/">ShopNest</router-link>
                    </span>
                </a>
            </router-link>
            <div class="flex md:order-2">
                <p v-if="flag" class="text-white my-2 mx-3">Welcome, <span class="text-cyan-500 text-bold">{{
                    loggedInUsername.toUpperCase() }}</span></p>
                <button v-if="!flag" type="button"
                    class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><router-link
                        to="/login">Login/Signup</router-link></button>
                <button v-if="flag" type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-red-600 hover:bg-red-700 focus:ring-red-800"
                    @click="logout">Logout</button>
                <div class="flex gap-1">
                </div>
            </div>
            <div class="items-start justify-start hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul class="text-white flex justify-around gap-4">
                    <button> <router-link to="/">Home</router-link> </button>
                    <button v-if="flag" class=""> <router-link to="/dashboard">Dashboard</router-link> </button>
                    <button v-if="!flag" class=""> <router-link to="/login">Dashboard</router-link> </button>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
