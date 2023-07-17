<template>
  <MindElixirVue :data="data" class="h-screen" />
  <Teleport to="body"> </Teleport>
</template>
<script setup lang="ts">
import data from 'mind-elixir/dist/example1'
import MindElixirVue from '@/components/MindElixirVue.vue'

const isNightTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
if (!isNightTheme) data.theme = undefined
</script>
