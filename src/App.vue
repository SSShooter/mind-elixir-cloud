<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import connect from '@/connect'

onMounted(async () => {
  const res = await connect.get('/api/user')
  if (res.data && res.data.id) {
    // isLogined = true
    // userData = res.data
    console.log(res.data)
  }
})
</script>

<template>
  <div class="absolute top-0 w-screen z-10 my-5">
    <NavBar class="w-3/5 m-auto rounded drop-shadow" />
  </div>
  <RouterView />
</template>

<style scoped></style>
