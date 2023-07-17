<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import connect from '@/connect'
import { ref, provide } from 'vue'
import { User } from './models/user'
import { Response } from './models/response'

const userData = ref<undefined | User>(undefined)
provide('userData', userData)
onMounted(async () => {
  const res = await connect.get<never, Response<User>>('/api/user')
  if (res.data && res.data.id) {
    userData.value = res.data
  }
})
</script>

<template>
  <div class="absolute top-0 w-screen z-10 my-5 pointer-events-none">
    <NavBar class="w-3/5 m-auto rounded drop-shadow pointer-events-auto" />
  </div>
  <RouterView />
</template>

<style scoped></style>
