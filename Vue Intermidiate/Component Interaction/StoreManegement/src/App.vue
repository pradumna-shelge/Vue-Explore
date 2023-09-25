<template>
  <div>
    <p>Count: {{ $store.state.count }}</p>
    <p>Double Count: {{ $store.getters.doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="incrementAsync">Increment Async</button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

const increment = () => {
  store.commit('increment')
}

const decrement = () => {
  store.commit('decrement')
}

const incrementAsync = () => {
  store.dispatch('incrementAsync')
}
</script>
