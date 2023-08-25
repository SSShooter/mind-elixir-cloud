<template>
  <MindElixirVue
    ref="meEl"
    :data="mapData"
    :plugins="plugins"
    :options="options"
    class="h-screen"
  />
</template>
<script setup lang="ts">
import MindElixirVue from '@/components/MindElixirVue.vue'
import { onMounted, ref } from 'vue'
import connect from '@/connect'
import { useRoute } from 'vue-router'
import { MindElixirData, Options } from 'mind-elixir'
import { MindMapItem } from '@/models/list'
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu-neo'

const plugins = [nodeMenu]
const route = useRoute()
const meEl = ref<InstanceType<typeof MindElixirVue> | null>(null)
const mapData = ref<MindElixirData | undefined>(undefined)
const options: Options = {
  el: '',
  direction: 2,
  draggable: false,
  editable: false,
  contextMenu: false,
  toolBar: true,
  keypress: false,
}
const mapId = route.params.id
onMounted(async () => {
  const res = await connect.get<never, { data: MindMapItem }>(
    '/api/public/' + mapId
  )
  mapData.value = res.data.content
})
</script>
