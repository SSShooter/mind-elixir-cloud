<template>
  <div ref="mindmapEl"></div>
</template>

<script setup lang="ts">
import MindElixir from 'mind-elixir'
import type { MindElixirData, MindElixirInstance, Options } from 'mind-elixir'
import { onMounted, ref, watch } from 'vue'
const props = defineProps<{
  data: MindElixirData | undefined
  options?: Options
  plugins?: any[]
}>()
const mindmapEl = ref<HTMLElement | null>(null)
let me: MindElixirInstance | null = null
onMounted(() => {
  const options = {
    ...props.options,
    el: mindmapEl.value as HTMLElement,
  }
  me = new MindElixir(options)
  for (const plugin of props.plugins || []) {
    me.install(plugin)
  }
  me.init(props?.data || MindElixir.new('LOADING'))
  me.scale(0.3)
})

watch(
  () => props.data,
  () => {
    me?.refresh(props.data)
  }
)
</script>
