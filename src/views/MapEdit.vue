<template>
  <MindElixirVue
    ref="meEl"
    :data="mapData"
    :plugins="plugins"
    :options="options"
    class="h-screen"
  />
  <Teleport to=".navbar-end">
    <button class="btn" @click="save">
      {{ $t('button.save') }}
    </button>
  </Teleport>
</template>
<script setup lang="ts">
import MindElixirVue from '@/components/MindElixirVue.vue'
import { onMounted, ref } from 'vue'
import connect from '@/connect'
import { useRoute } from 'vue-router'
import { MindElixirData, Options } from 'mind-elixir'
import { MindMapItem } from '@/models/list'
// @ts-ignore
import nodeMenu from '@mind-elixir/node-menu'
import '@mind-elixir/node-menu/dist/style.css'

const plugins = [nodeMenu]
const route = useRoute()
const meEl = ref<InstanceType<typeof MindElixirVue> | null>(null)
const mapData = ref<MindElixirData | undefined>(undefined)
const options: Options = {
  el: '',
  direction: 2,
}
const mapId = route.params.id
onMounted(async () => {
  const res = await connect.get<never, { data: MindMapItem }>(
    '/api/map/' + mapId
  )
  mapData.value = res.data.content
})

const saving = ref(false)
const save = async () => {
  if (saving.value === true) return
  saving.value = true
  const newData = meEl.value?.instance?.getData() as MindElixirData
  await connect.patch('/api/map/' + mapId, {
    name: newData.nodeData.topic,
    content: newData,
  })
  saving.value = false
}
</script>
