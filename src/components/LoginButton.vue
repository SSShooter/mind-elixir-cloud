<template>
  <button class="btn" @click="login">
    <span class="iconfont icon-github-fill"></span>
    Login
  </button>
</template>
<script setup lang="ts">
const login = () => {
  location.href = import.meta.env.VITE_OAUTH_URL
}
</script>
