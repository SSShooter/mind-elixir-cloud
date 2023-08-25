<template>
  <MindElixirVue
    ref="meEl"
    :data="mapData"
    :plugins="plugins"
    :options="options"
    class="h-screen"
  />
  <div v-if="isUnsaved" class="fixed bottom-10 left-6 dark:text-gray-200">
    Unsaved
  </div>
  <div v-if="lastSavedTime" class="fixed bottom-6 left-6 dark:text-gray-200">
    Last saved time: {{ lastSavedTime }}
  </div>
  <Teleport to=".navbar-end">
    <button class="btn" @click="save">
      {{ t('button.save') }}
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
import nodeMenu from '@mind-elixir/node-menu-neo'

import { useI18n } from 'vue-i18n'
import toast from '@/utils/toast'

const { t } = useI18n()
const plugins = [nodeMenu]
const route = useRoute()
const lastSavedTime = ref('')
const isUnsaved = ref(false)
const meEl = ref<InstanceType<typeof MindElixirVue> | null>(null)
const mapData = ref<MindElixirData | undefined>(undefined)
const options: Options = {
  el: '',
  direction: 2,
  allowUndo: true,
}
const mapId = route.params.id
onMounted(async () => {
  const res = await connect.get<never, { data: MindMapItem }>(
    '/api/map/' + mapId
  )
  mapData.value = res.data.content
  meEl.value?.instance?.bus.addListener('operation', () => {
    isUnsaved.value = true
  })
  meEl.value?.instance?.map?.addEventListener('keydown', (e) => {
    e.preventDefault()
    console.log(e, e.target)
    if (e.target !== e.currentTarget) {
      // input
      return
    }
    if(e.ctrlKey && e.key === 's') {
      save()
    }
  })
})

const saving = ref(false)
const save = async () => {
  if (saving.value || !isUnsaved.value) return
  saving.value = true
  const newData = meEl.value?.instance?.getData() as MindElixirData
  newData.theme = undefined
  await connect.patch('/api/map/' + mapId, {
    name: newData.nodeData.topic,
    content: newData,
  })
  saving.value = false
  isUnsaved.value = false
  lastSavedTime.value = new Date().toLocaleString()
  toast.success('Saved')
}
</script>
