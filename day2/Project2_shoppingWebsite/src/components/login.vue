<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import router from '../router';

let formData = reactive({
  email: '',
  password: ''
});

const rules = computed(() => {
  return {
    password: { required, minLength: minLength(3) },
    email: { required, email },
    
  };
});

const $v = useVuelidate(rules, formData);

async function handleLogin () {

   var d = await $v.value.$validate()

   if(d){
   
    
   
  if(formData.email=='admin@gmail.com' && formData.password=='admin'){

    router.replace(`/home`)
  }
  else{
        
    if(formData.email!='admin@gmail.com'){
        errMsg.value = 'email is invalid'
    }
    else if(formData.email == 'admin@gmail.com' && formData.password != "admin" ){
             errMsg.value = 'incorrect password'
    }
    else{
      errMsg.value = 'Invalid email or password'
    }
  }
   }
  
};


const errMsg = ref('')
</script>

<template>
  <div class=" d-flex justify-content-center     mt-5">
  
     
        <form class=" p-3 rounded bg-white shadow w-50" @submit.prevent="handleLogin">
          <small class="text-danger small" v-if="errMsg">{{ errMsg }}</small>
          <div class="mb-3">
            <label for="email" class="form-label fs-5">Email</label>
             <input
                type="text"
                v-model="formData.email"
                name="email"
                id="email"
                class="form-control form-control-lg"
                placeholder="Enter email"
              />
  <span class="text-danger" v-for="error in $v.email.$errors">{{
    error.$message
  }}</span>          </div>

          <div class="form-group mb-3">
            <label for="password" class="form-label fs-5">Password</label>
            <div class="input-group">
               <input
                  
                  v-model="formData.password"
                  name="password"
                  id="password"
                  class="form-control form-control-lg"
                  placeholder="Password"
                />
            </div>
  <span class="text-danger" v-for="error in $v.password.$errors">{{
    error.$message
  }}</span>          </div>

          <button type="submit" class="btn btn-lg btn-block w-100 bg-primary">Login</button>
          <span>Take data from console for login !!</span>
        </form>
      </div>
  

</template>



<style scoped></style>
