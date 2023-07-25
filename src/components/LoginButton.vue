<template>
  <button class="btn" @click="login">
    <span class="iconfont icon-github-fill"></span>
    Login
  </button>
</template>
<script setup lang="ts">
const login = () => {
  location.href = import.meta.env.VITE_API_BASEURL + '/oauth/github/login'
}
</script>
