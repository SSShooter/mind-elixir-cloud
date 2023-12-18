<template>
  <div class="max-w-md mx-auto">
    <div
      class="relative flex items-center"
    >
      <div class="grid place-items-center h-full w-12 text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        class="input input-bordered w-full max-w-xs"
        type="text"
        id="search"
        placeholder="Search something.."
        @change="search"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(['search'])
const search = (e: Event) => {
  emits('search', (e.target as HTMLInputElement)?.value)
}
</script>
