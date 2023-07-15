<template>
  <div ref="mindmapEl"></div>
</template>

<script setup lang="ts">
import MindElixir from 'mind-elixir'
import type { MindElixirData, MindElixirInstance, Options } from 'mind-elixir'
import { onMounted, ref, watchEffect } from 'vue'
const props = defineProps<{
  data: MindElixirData | undefined
  options?: Options
  plugins?: any[]
  initScale?: number
}>()
const mindmapEl = ref<HTMLElement | null>(null)
let me = ref<MindElixirInstance | null>(null)
onMounted(() => {
  const options = {
    ...props.options,
    el: mindmapEl.value as HTMLElement,
  }
  me.value = new MindElixir(options)
  for (const plugin of props.plugins || []) {
    me.value.install(plugin)
  }
  if (props.initScale) {
    me.value.scaleVal = props.initScale || 1
    me.value.map.style.transform = 'scale(' + props.initScale + ')'
  }
})
let isInit = false
watchEffect(() => {
  if (!props.data || !me.value) return
  if (!isInit) {
    me.value.init(props.data)
    isInit = true
    return
  }
  me.value.refresh(props.data)
})
defineExpose({
  instance: me,
})
</script>