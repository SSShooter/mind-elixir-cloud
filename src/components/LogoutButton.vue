<template>
  <button class="btn" @click="logout">
    <GithubIcon />
    Logout
  </button>
</template>
<script setup lang="ts">
import GithubIcon from '@/components/icons/GithubIcon.vue'
import connect from '@/connect'

const logout = async () => {
  await connect.get('/logout')
}
</script>
