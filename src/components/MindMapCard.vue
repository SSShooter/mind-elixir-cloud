<template>
  <div class="card box-content bg-base-100 shadow">
    <figure class="w-full aspect-video">
      <MindElixirVue
        :data="map.content"
        :options="options"
        :initScale="0.2"
        class="h-full w-full"
      />
    </figure>
    <div class="m-4">
      <div class="flex items-center">
        <h2 class="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
          {{ map.name }}
        </h2>
        <span v-if="map.public" class="badge ml-1">Public</span>
      </div>
      <p>{{ timeFormatter(map.updatedAt || map.date) }}</p>
    </div>
    <div class="dropdown dropdown-end absolute right-2 top-2">
      <EllipsisButton @click.prevent />
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow rounded-box w-52"
        @click.prevent
      >
        <li v-if="type === 'private'" @click="emit('makePublic')">
          <a>{{ map.public ? 'Make it private' : 'Make it public' }}</a>
        </li>
        <li v-if="map.public" @click="emit('share')"><a>Share</a></li>
        <li>
          <a>Download</a>
          <ul>
            <li @click="emit('download', 'html')"><a>HTML</a></li>
            <li @click="emit('download', 'xmind')"><a>Xmind</a></li>
            <li @click="emit('download', 'json')"><a>JSON</a></li>
          </ul>
        </li>
        <li v-if="type === 'private'" @click="emit('delete')">
          <a class="hover:bg-red-500 hover:text-white">Delete</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import MindElixirVue from '@/components/MindElixirVue.vue'
import EllipsisButton from '@/components/EllipsisButton.vue'
import { Options } from 'mind-elixir'
import { MindMapItem } from '@/models/list'
import { timeFormatter } from '@/utils'

defineProps<{
  map: MindMapItem
  type: 'public' | 'private'
}>()

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'download', type: string): void
  (e: 'makePublic'): void
  (e: 'share'): void
}>()

const options: Options = {
  el: '',
  direction: 2,
  draggable: false,
  editable: false,
  contextMenu: false,
  toolBar: false,
  keypress: false,
  overflowHidden: true,
}
</script>
