<script setup lang="js">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex'; 
import { getCartData, ProductCartDelete, addCartData } from '../Services/cartServices'
import { getApiData, discription, productName } from '../Services/products'
const store = useStore();
const cartItems = computed(() => store.getters.cartItems)

const loadCartData=()=>{
 getCartData()
    .then((data) => {
      store.dispatch('addList', data)

    })
    .catch((error) => {

    });
}


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




const removeFromCart=()=>{
  debugger;
  ProductCartDelete(DeleteId.value).then((d) => {
    getCartData()
      .then((data) => {
        store.dispatch('addList', data)
        
      })
      .catch((error) => {

      });
    openModal.value = false;

  }).catch((d) => {
     openModal.value=false;
    console.log(d)
  });
}

const updateCount=(name,quantity,incFlg)=>{
  const count = incFlg ? quantity+1:quantity-1;
  debugger;
  addCartData(name, count).then((d) => {
    getCartData()
      .then((data) => {
        store.dispatch('addList', data)
      })
      .catch((error) => {

      });

  }).catch((d) => {
    console.log(d)
  });
}

onMounted(() => {

    loadCartData();


});
</script>


<template>

       <div v-if="store.getters.cartItemCount>0 " class="  flex justify-center gap-10 ">
        <!-- Cart Count at the Top -->
     
        <!-- Card Grid -->
        <div class="">

 
  <p class="text-gray-500 mx-3">You have {{store.getters.cartItemCount }} items in your cart</p>

            <div class="  flex flex-col ">
              <div v-for="(item, index) in cartItems" :key="item.cartId" class="">
                <div class="flex bg-white shadow-md rounded-md overflow-hidden  m-1 w-card">
                  <!-- Left Div with Image -->
                  <div class="flex flex-col justify-center">
                    <img :src="item.productImage" alt="Product Image" class=" img-w w-full object-cover">
                  </div>
    
                  <!-- Right Div with Product Info -->
                  <div class=" p-5 flex flex-col justify-between w-96">
                    <div class="flex justify-between">
                      <h2 class="text-lg font-semibold text-gray-800">{{ item.productName }}</h2>
                     
                                  <div class="flex flex-row h-fit rounded-lg relative bg-transparent mt-1 border rounded">
      <button :disabled="item.quantity == 1"  @click="updateCount(item.productName,item.quantity,false)" data-action="decrement" class=" bg-red-300 text-red-600 hover:text-red-700 hover:bg-red-400  rounded-l cursor-pointer outline-none">
        <span class="m-auto text-xl px-2">−</span>
      </button>
      <p class="px-5" >{{item.quantity  }}</p>
    <button  @click="updateCount(item.productName,item.quantity,true)" data-action="increment" class="bg-green-300 text-green-600 hover:text-green-700 hover:bg-green-400  rounded-r cursor-pointer">
      <span class="m-auto text-xl px-2">+</span>
    </button>
  </div>
                    </div>
                    <div class="text-sm text-gray-600">{{  discription( item.description) }}</div>
                    <!-- <div class="mt-2 flex justify-between items-center">
                      <div class="text-md font-semibold text-gray-800">${{ item.price }}</div>
                    </div> -->
                    <div class="mt-2 flex justify-between items-center">
                      <button @click="open(item.cartId)" class=" items-center flex gap-1 text-xs text-gray-900 hover:text-white border border-gray-800 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center   text-gray-400 hover:text-white  ">    <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-5 h-5"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      /></svg>Remove item</button>
                      <div class="text-md font-semibold text-gray-800">${{ item.price  }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
     <div class="mt-5">

         <div class="   p-4 border  rounded-lg bg-white">
             <h2 class="text-xl font-semibold mb-4">Checkout</h2>
   
             <!-- Subtotal -->
             <div class="flex justify-between mb-2">
               <span class="text-gray-700">Sub Total:</span>
               <span class="text-gray-900">${{ store.getters.cartMrpPrice }}</span>
             </div>
   
             <!-- Discount (if applicable) -->
             <div class="flex justify-between mb-2" >
               <span class="text-gray-700">Discount:</span>
               <span class="text-red-600 text-xs">-${{    store.getters.cartMrpPrice- store.getters.cartTotalPrice<1 ?0: parseFloat(store.getters.cartMrpPrice - store.getters.cartTotalPrice).toFixed(2) }}</span>
             </div>
   
             <!-- Total Amount -->
             <div class="flex justify-between mt-4">
               <span class="text-lg font-semibold">Total:</span>
               <span class="text-lg font-semibold">${{ store.getters.cartTotalPrice }}</span>
             </div>
   
             <!-- Checkout Button -->
             <button class="mt-4 bg-cyan-600 text-white hover:bg-cyan-700 py-2 px-4 rounded-md w-full">
               Proceed to Checkout
             </button>
           </div>
     </div>
       </div>
<div v-else class="flex flex-col gap-5">

  <div class="  flex justify-center gap-10 ">
<img src="../assets/empty-cart.png" alt="">


</div>
<div class="  flex justify-center gap-10  ">
<button class="bg-sky-500 hover:bg-sky-700 text-white py-2 rounded px-10 "> <router-link to="/">Shop Now</router-link>  </button>  

</div>
</div>


    <div v-if="openModal" class="modal ">
          <div class="modal-content rounded-xl text-center">
            <span @click="closeModal" class="hover:cursor-pointer text-rose-500" style="float:right;">&times;</span>
          
              <h2 class="text-xl">Remove Item</h2>
            <p class="text-gray-500 ">Are you sure you want to remove this item?</p>
            <div class="modal-buttons flex justify-center p-5">
              <button @click="removeFromCart" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 focus:ring-red-800 shadow-lg shadow-red-500/50 shadow-lg shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >Remove</button>
              <button @click="closeModal" class="text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 focus:ring-gray-800 shadow-lg shadow-gray-500/50 shadow-lg shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cancel</button>
            </div>
          </div>
        </div>
</template>


<style scoped>
.img-w{
    width: 150px;
    height: 146px;

}

.left{
  width: 170px;
  height: 146px;
}
.w-card{
    max-width: 100%;
  height: auto;
  padding: 3px;
}
.left-div {
 width: -webkit-fill-available;
  overflow-y: scroll; /* Enable vertical scrolling for the left div */
}

.right-div {
  width: 300px; /* Set a fixed width for the right div */
  position: fixed;
  left: 70%;
  top: 19%; /* Stick the right div to the top of the container */
  /* You can also add other styles like background color, padding, etc. */
}
</style>