<template>
  <div class="card box-content bg-base-100 shadow">
    <figure class="w-full aspect-square">
      <MindElixirVue
        :data="map?.content"
        :options="options"
        class="h-full w-full"
      />
    </figure>
    <div class="m-4">
      <h2 class="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
        {{ map?.name }}
      </h2>
      <p>{{ map?.updatedAt || map?.date }}</p>
      <!-- <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import MindElixirVue from '@/components/MindElixirVue.vue'
import { Options } from 'mind-elixir'
import { MindMapItem } from '@/models/list'
defineProps<{
  map: MindMapItem | undefined
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
