<template> 
  <button class="btn" @click="createModal?.showModal()">
    {{ t('button.new') }}
  </button>
</template>
<script setup lang="ts">
import connect from '@/connect'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const createModal = ref<HTMLDialogElement | null>(null)
const title = ref('')
const router = useRouter()
const { t } = useI18n()
const save = async function () {
  const newMap = await connect.post('/api/map', {
    content: {
      nodeData: {
        id: 'root',
        topic: title.value,
        root: true,
        children: [],
      },
      linkData: {},
    },
    name: title.value,
  })
  router.push({
    path: '/edit/' + newMap.data._id,
  })
  createModal.value?.close()
}
</script>
