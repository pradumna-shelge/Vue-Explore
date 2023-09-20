<script setup lang="js">
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue'; 
import Footer from './components/Footer.vue'; 


const loginFlag = ref(false);

const handleLoginSuccess = () => {
  console.log("Called in main Vue app");
  if (isLoggedIn()) {
    loginFlag.value = true;
  } else {
    loginFlag.value = false;
  }
};

const isLoggedIn = () => {
  return (localStorage.getItem('userInfo') != null);
};

onMounted(() => {
  handleLoginSuccess();
});
</script>

<template>
  <Navbar :flag="loginFlag" @login-success1="handleLoginSuccess"></Navbar>

  <div class="min-h-screen flex flex-col">
    <main class="flex-grow my-20">
      <router-view @login-success="handleLoginSuccess"></router-view>
    </main>

    <footer class="bg-gray-300 py-4">
      <Footer></Footer>
    </footer>
  </div>
</template>

<style scoped>

</style>
