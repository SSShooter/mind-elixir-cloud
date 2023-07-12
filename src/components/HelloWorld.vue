<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <span class="countdown font-mono text-6xl">
  <span style="--value:53;"></span>
</span>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
