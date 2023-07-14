<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="absolute top-0 w-screen z-10 my-5">
    <NavBar class="w-3/5 m-auto rounded drop-shadow" />
  </div>
  <RouterView />
</template>

<style scoped></style>
