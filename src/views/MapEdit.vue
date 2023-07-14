<template>
  <MindElixirVue :data="mapData" :plugins="plugins" class="h-screen" />
</template>
<script setup lang="ts">
import MindElixirVue from '@/components/MindElixirVue.vue'
import { onMounted, ref } from 'vue'
import connect from '@/connect'
import { useRoute } from 'vue-router'
import { MindElixirData } from 'mind-elixir'
import { MindMapItem } from '@/models/list'
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu'
import '@mind-elixir/node-menu/dist/style.css'

const plugins = [nodeMenu]
const route = useRoute()
const mapData = ref<MindElixirData | undefined>(undefined)
onMounted(async () => {
  const res = await connect.get<never, { data: MindMapItem }>(
    '/api/public/' + route.params.id
  )
  console.log(res)
  mapData.value = res.data.content
})
</script>
