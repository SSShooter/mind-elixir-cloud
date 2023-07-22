<template>
  <div class="join" v-if="totalPage > 1">
    <button
      class="join-item btn btn-sm"
      :class="{ 'btn-disabled': page <= 1 }"
      @click="pre"
    >
      «
    </button>
    <button class="join-item btn btn-sm">{{ page }}</button>
    <button
      class="join-item btn btn-sm"
      :class="{
        'btn-disabled': page >= totalPage,
      }"
      @click="next"
    >
      »
    </button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  total: number
  page: number
  pageSize: number
}>()
const emit = defineEmits(['update:page'])
const totalPage = Math.ceil(props.total / props.pageSize)
const pre = () => {
  emit('update:page', props.page - 1)
}
const next = () => {
  emit('update:page', props.page + 1)
}
</script>
