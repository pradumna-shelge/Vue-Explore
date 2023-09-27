<script setup lang='js'>
import * as XLSX from 'xlsx';
import spinner from './spinner.vue'
import { reactive, ref, computed, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { CustomValidationMsg } from '../../Vadidators/index'
import { email, minLength, required } from '@vuelidate/validators';
import { isLogin, setUserInfo, loginUser } from '../../Services/islogin'
import { loginRole } from './../../Services/islogin'
import {getUsers, UserDelete, AddUser, UpdateUser } from '../../Services/users'
import {formatDate} from '../../Services/FormatDate'
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ /* options */ });
const { getData, data, error } = getUsers();
const users = ref([]);
const usersTemp =  ref([]);
let userUpdateFlag = ref(false)
const flag = ref(true)
////get user data ///
const getUserData = async () => {
  flag.value = true;
    await getData().then(() => {
         flag.value = false;
    });
    console.log(data.value);
    users.value = data.value;
      totalItem.value = data.value.length
    usersTemp.value = data.value
    // totalItem.value = data.value.length
};

let formData = reactive({
  userId:'',
    username: '',
    password: '',
    email: '',
});

const rules = computed(() => {
    return {
      userId:{},
        username: { required },
        password: !userUpdateFlag.value ? {  required  }:{},
        email: { required, email },
        
      };
    });
    const $v = useVuelidate(rules, formData);
    
    ////////user add ////////////////////////
async function userAdd() {
    var d = await $v.value.$validate()

    if (d) {
      debugger;
    flag.value = true;
    console.log(formData);
         AddUser (formData.username.toLowerCase().replace(/\s{2,}/g, ' ').trim() ?? "", formData.email.replace(/\s{2,}/g, ' ').trim() ?? "", formData.password).then((bcv)=>{
      
          flag.value = false;
          toaster.success('User added successfully');
          getUserData();
          formData.username = '';
          formData.password = '';
          formData.email = '';
        document.getElementById('userForm').reset();
      $v.value.$reset();
        })
        .catch((error) => {
      flag.value = false;
      toaster.error(error.response.data + "!");
    });
    }
}

//////////////update user ///////////
async function updateUser() {
  var d = await $v.value.$validate()

  if (d) {
    debugger;
    flag.value = true;
    console.log(formData);
    UpdateUser(formData.userId,formData.username.toLowerCase().replace(/\s{2,}/g, ' ').trim() ?? "", formData.email.replace(/\s{2,}/g, ' ').trim() ?? "", formData.password).then((bcv) => {

      flag.value = false;
      toaster.success('User updated successfully');
      userUpdateFlag.value=false
      getUserData();
      formData.userId = -1;
      formData.username = '';
      formData.password = '';
      formData.email = '';
      document.getElementById('userForm').reset();
      $v.value.$reset();
    })
      .catch((error) => {
        flag.value = false;
        toaster.error(error.response.data + "!");
      });
  }
}


////////reset from/////////////////

const cancelUpdate = () => {
    userUpdateFlag.value = false

    formData.username = null;
        formData.password = null;

            formData.email = null;

  
    document.getElementById('userForm').reset();
    $v.value.$reset();

}


//////////sorting /////
const sortColumn = (col, sortFlag) => {

    switch (col) {
        case 'username':
            users.value.sort((a, b) => {
                const nameA = a.username.toUpperCase();
                const nameB = b.username.toUpperCase();
                if (nameA < nameB) return sortFlag ? -1 : 1;
                if (nameA > nameB) return sortFlag ? 1 : -1;
                return 0;
            });
            break;
        case 'email':
            users.value.sort((a, b) => {
                const nameA = a.email.toUpperCase();
                const nameB = b.email.toUpperCase();
                if (nameA < nameB) return sortFlag ? -1 : 1;
                if (nameA > nameB) return sortFlag ? 1 : -1;
                return 0;
            });
            break;
        case 'lastLogin':
            users.value.sort((a, b) => {
                const nameA = a.lastLogin;
                const nameB = b.lastLogin;
                if (nameA < nameB) return sortFlag ? -1 : 1;
                if (nameA > nameB) return sortFlag ? 1 : -1;
                return 0;
            });
            break;
    }
}



/////////// searching ////////////


const searchColumn = (col, key) => {
    key = key.trim();
    key = key.split("  ").join(" ")
    console.log(key);
    switch (col) {
        case 'username':
            users.value = usersTemp.value.filter((a) => a.username.toLowerCase().match(key.toLowerCase()));
            break;
        case 'email':
            users.value = usersTemp.value.filter((a) => a.email.toLowerCase().match(key.toLowerCase()));
            break;
    }
}


//////print user tabel//////////
const printTable = () => {
    const data = users.value;


    const filteredData = data.map(item => {
        const { username, email, lastLogin } = item;
        return { Username: username, Email: email, 'last login': formatDate( new Date( lastLogin)) };
    });


    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'User Data.xlsx');
};

////////////////////// patch user /////////
const patchValue = (ob) => {
  console.log(ob);
  userUpdateFlag.value=true;
 formData.userId=ob.userId
 formData.username=ob.username
 formData.password='user-password'
formData.email = ob.email
}

///////////////////////////pagination ////////////
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItem = ref(0);
const perPageOptions = [5, 10, 15, 20, 25];
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  // asyncFunction();  
};

const resetpageNo = () => {
  handlePageChange(1)
}

const displayedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return users.value.slice(start, end);
});
 

//////////// delete user ///////////////
const openModal = ref(false);
const DeleteId = ref(0);
const open = (id) => {
  debugger;
  openModal.value = true;
  DeleteId.value = id
}
const closeModal = () => {
  openModal.value = false;
  DeleteId.value = -1
}
async function deleteUser() {
  flag.value = true;
  openModal.value = false
  try {

    await UserDelete(DeleteId.value);

    toaster.success("User deleted successfully.");
    getUserData();
  } catch (error) {
    console.error(error.response.data + "!");
    flag.value = false;
    toaster.error(error.response.data + "!");
  }
}

onMounted(() => {
    getUserData();
    cancelUpdate();
});


</script>



<template>
    <spinner :flag="flag"></spinner>
    <div class="flex flex-row justify-center gap-10">
        <div class="basis-1/4 " v-show="loginRole == 'admin'">
          <div class=" border w-full bg-white rounded-lg hover:shadow-xl  md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1
                                 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl "
                               >
                               {{ userUpdateFlag ? "Update User" : "User Information" }}
                               </h1>

              
            <form
                         id="userForm"
                         class="space-y-4  md:space-y-6 text-end"
                         @submit.prevent="userAdd"
                         enctype="multipart/form-data"
                       >
                         <div>
                           <!-- <label for="productName"
                                     class="block mb-2 text-sm font-medium text-gray-900 ">Product Name</label> -->
                           <input maxlength="80"
                           :class="{ 'border-2 border-rose-600 ': $v.username.$error }"
                           id="product"
                             v-model="formData.username"
                             type="text"
                             class=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  border-gray-600   focus:ring-blue-500 focus:border-blue-500"
                             placeholder="User Name"
                           />
                           <span
                             class="text-red-400 text-xs text-end" 
                             v-for="error in $v.username.$errors"
                             >{{ CustomValidationMsg(error.$message, "UserName") }}</span
                           >
                         </div>
                          <div>
                               <!-- <label for="productName"
                                     class="block mb-2 text-sm font-medium text-gray-900 ">Product Name</label> -->
                               <input maxlength="80"
                               :class="{ 'border-2 border-rose-600 ': $v.password.$error }"
                               id="product"
                                 v-model="formData.password"
                                 type="password"
                                 class=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  border-gray-600   focus:ring-blue-500 focus:border-blue-500"
                                 placeholder="User Password"
                               />
                               <span
                                 class="text-red-400 text-xs text-end" 
                                 v-for="error in $v.password.$errors"
                                 >{{ CustomValidationMsg(error.$message, "User Password") }}</span
                               >
                             </div>
                         
                           <div>
                                   <!-- <label for="productName"
                                     class="block mb-2 text-sm font-medium text-gray-900 ">Product Name</label> -->
                                   <input maxlength="80"
                                   :class="{ 'border-2 border-rose-600 ': $v.email.$error }"
                                   id="product"
                                     v-model="formData.email"
                                     type="email"
                                     class=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  border-gray-600   focus:ring-blue-500 focus:border-blue-500"
                                     placeholder="User email"
                                   />
                                   <span
                                     class="text-red-400 text-xs text-end" 
                                     v-for="error in $v.email.$errors"
                                     >{{ CustomValidationMsg(error.$message, "User Email") }}</span
                                   >
                                 </div>
                         <!-- <button
                       type="submit"
                       class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                     >
                       Add Product
                     </button> -->
                   <div class="flex items-center justify-center gap-5">
             <button
             v-if="!userUpdateFlag"
               type="submit" class=" btn text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-green-500 text-green-500 hover:text-white hover:bg-green-600 focus:ring-green-900">
               Add User
             </button>
     
     
            <button
            @click="updateUser()"
               v-if="userUpdateFlag"
                 type="button" class="  btn text-cyan-700 hover:text-white border border-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-cyan-500 text-cyan-500 hover:text-white hover:bg-cyan-600 focus:ring-cyan-900">
                 Update 
               </button>
                 <button @click="cancelUpdate"   type="button" class=" btn text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-900">{{ userUpdateFlag ? 'Cancel' : 'Reset' }}</button>
     
     
           </div>
     
                       </form>
                         </div>
          </div>
        </div>
        <div>
             <table id="productTable" class="text-left border-collapse w-full bg-white shadow-lg">
               <thead>
                 <tr class="border-y">
                       <th
                          class="  px-6 py-3   text-sm leading-4 font-medium text-gray-500 tracking-wider"
                        >
                           <span class="flex justify-center"> <span>Username</span>  <svg   @click="sortColumn('username', true)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="hover:text-gray-900 bi bi-caret-up-fill" viewBox="0 0 16 16">
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg><svg @click="sortColumn('username', false)"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="hover:text-gray-900 bi bi-caret-down-fill" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg></span>
        <div class="flex justify-center">
  
          <input placeholder="search  by username"  class="border-2  rounded px-1" type="text"  @input="searchColumn('username', $event.target.value)">
        </div>
                        </th>
                   <th
                              class="  px-6 py-3   text-sm leading-4 font-medium text-gray-500 tracking-wider"
                            >
                               <span class="flex justify-center"> <span>Email</span>  <svg   @click="sortColumn('email', true)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="hover:text-gray-900 bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg><svg @click="sortColumn('email', false)"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="hover:text-gray-900 bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg></span>
            <div class="flex justify-center">
  
              <input placeholder="search  by email"  class="border-2  rounded px-1" type="text"  @input="searchColumn('email', $event.target.value)">
            </div>
                            </th>
                   <th
                              class="  px-6 py-3   text-sm leading-4 font-medium text-gray-500 tracking-wider"
                            >
                               <span class="flex justify-center"> <span>Last login</span>  <svg   @click="sortColumn('lastLogin', true)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="hover:text-gray-900 bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg><svg @click="sortColumn('lastLogin', false)"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="hover:text-gray-900 bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg></span>
            <div class="flex justify-center">
  
            </div>
                            </th>
           
                                  <td v-if="loginRole == 'admin'" >     <div class="flex justify-center">
                        <button @click="printTable()" class="Btn">
             <svg class="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
             <span class="icon2"></span>
             <span class="tooltip">Download</span>
          </button>
        </div></td>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="(user, index) in displayedProducts" :key="index" class="hover:bg-gray-100 text-left">
                   <td class="px-6 py-4 whitespace-no-wrap border-b">{{ user.username }}</td>
                   <td class="px-6 py-4 whitespace-no-wrap border-b">{{ user.email }}</td>
                   <td class="px-6 py-4 whitespace-no-wrap border-b">{{ formatDate (new Date( user.lastLogin)) }}</td>
                  <td v-if="loginRole == 'admin'"
                          class="flex gap-5 px-3 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
                        >
                          <a @click="patchValue(user)" class="text-indigo-600 hover:text-indigo-900"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </a>
  
                          <a
                            @click="open(user.userId)"
                            class="text-red-600 hover:text-red-900"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  /></svg></a>
                        </td>
                 </tr>
               </tbody>
             </table>
             <div class="flex justify-end mt-10">
      <div class=" ">
              <label for="itemsPerPage" class=" mb-2 text-sm font-medium text-gray-900">Items Per Page</label>
              <select
              @change="resetpageNo"
                id="itemsPerPage"
                v-model="itemsPerPage"
                class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none text-gray-400 border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
                  <vue3-tailwind-pagination class="bg-new text-black"
             :total="totalItem"
             :per_page="itemsPerPage"
             :active_color="'text-white'"
             :active_background="'bg-rose-500'"
             :current_page="currentPage"
             @change="handlePageChange"
           />
                </div>
           </div>
    </div>


    <div v-if="openModal" class="modal ">
        <div class="modal-content rounded-xl text-center">
          <span @click="closeModal" class="hover:cursor-pointer text-rose-500" style="float:right;">&times;</span>
          <div class="flex justify-center  p-5">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-rose-500 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
            <h2 class="text-xl">Confirm Delete</h2>
          <p class="text-gray-500 ">Are you sure you want to delete this User?</p>
          <div class="modal-buttons flex justify-center p-5">
            <button @click="deleteUser" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 focus:ring-red-800 shadow-lg shadow-red-500/50 shadow-lg shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >Yes, delete it!</button>
            <button @click="closeModal" class="text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 focus:ring-gray-800 shadow-lg shadow-gray-500/50 shadow-lg shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cancel</button>
          </div>
        </div>
      </div>
</template>




<style scoped>
.bg-new{
  background-color: rgba(255, 0, 0, 0);
}
th {
    max-width: 200px !important;
    min-width: 50px !important;

}

.btn {
    width: 150px;
}

.Btn {
    width: 37px;
    height: 34px;
    border: none;
    border-radius: 50%;
    background-color: rgb(7, 2, 85);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.11);
}

.svgIcon {
    fill: rgb(214, 178, 255);
}

.icon2 {
    width: 11px;
    height: 5px;
    border-bottom: 2px solid rgb(182, 143, 255);
    border-left: 2px solid rgb(182, 143, 255);
    border-right: 2px solid rgb(182, 143, 255);
}

.tooltip {
    position: absolute;
    right: -105px;
    opacity: 0;
    background-color: rgb(12, 12, 12);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-duration: .2s;
    pointer-events: none;
    letter-spacing: 0.5px;
}

.tooltip::before {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    background-color: rgb(12, 12, 12);
    background-size: 1000%;
    background-position: center;
    transform: rotate(45deg);
    left: -5%;
    transition-duration: .3s;
}

.Btn:hover .tooltip {
    opacity: 1;
    transition-duration: .3s;
}

.Btn:hover {
    background-color: rgb(150, 94, 255);
    transition-duration: .3s;
}

.Btn:hover .icon2 {
    border-bottom: 2px solid rgb(235, 235, 235);
    border-left: 2px solid rgb(235, 235, 235);
    border-right: 2px solid rgb(235, 235, 235);
}

.Btn:hover .svgIcon {
    fill: rgb(255, 255, 255);
    animation: slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-in-top {
    0% {
        transform: translateY(-10px);
        opacity: 0;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
}
</style>