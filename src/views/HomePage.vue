<template>
  <MindElixirVue :data="data" class="h-screen" />
  <Teleport to="body"> </Teleport>
</template>
<script setup lang="ts">
import data from 'mind-elixir/example'
import MindElixirVue from '@/components/MindElixirVue.vue'
</script>
