<template>
  <dialog ref="dialog" class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-lg">{{ props.title }}</h3>
      <p class="py-4">{{ content }}</p>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn" @click="handleClose">Close</button>
        <button class="btn btn-primary" @click="handleOK">OK</button>
      </div>
    </form>
  </dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  content: string
}>()
const dialog = ref<HTMLDialogElement | null>(null)
let resolve = (_value: unknown) => {}
let reject = (_value: unknown) => {}
const confirm = () => {
  return new Promise((res, rej) => {
    resolve = res
    reject = rej
    dialog.value?.showModal()
  })
}
const handleClose = () => {
  dialog.value?.close()
  reject('cancel')
}
const handleOK = () => {
  dialog.value?.close()
  resolve('ok')
}
defineExpose({
  confirm,
})
</script>
