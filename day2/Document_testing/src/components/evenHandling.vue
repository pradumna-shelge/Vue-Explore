<script setup lang='ts'>

    function innerClick() {
        console.log('Inner button clicked');
    }
  function  outerClick() {
        console.log('Outer div clicked');
}

function submitForm() {
    console.log('Form submitted');
}
function  handleClick() {
    console.log('Div clicked, not the button');
}
</script>


<template>
<div @click="outerClick">
    <button @click="innerClick">Click me</button>
  </div>

    <form @submit.prevent="submitForm">
        <button type="submit">Submit</button>
      </form>


      <div class="p-10 bg-red-500" @click.self="handleClick">
        <button>Click me</button>
      </div>


       <div class="p-10 bg-red-500 m-2" @click.once="handleClick">
            <button>Click me</button>
          </div>
</template>

