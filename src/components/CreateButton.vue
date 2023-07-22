<template>
  <!-- Open the modal using ID.showModal() method -->
  <div
    class="border rounded-2xl border-dashed hover:border-primary flex justify-center items-center flex-col cursor-pointer"
    @click="createModal?.showModal()"
  >
    <img src="@/assets/create.svg" class="h-2/3" alt="Create Mindmap" />
    <div><span class="font-extrabold">+</span> {{ t('button.new') }}</div>
  </div>
  <Teleport to="body">
    <dialog ref="createModal" @keypress.enter.prevent class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">{{ t('misc.title') }}</h3>
        <div class="pt-6">
          <input
            v-model="title"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
          />
        </div>
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">{{ t('misc.cancel') }}</button>
          <div
            :aria-roledescription="t('misc.ok')"
            class="btn btn-primary"
            @click="createMaps"
          >
            {{ t('misc.ok') }}
          </div>
        </div>
      </form>
    </dialog>
  </Teleport>
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

// handle enter
const createMaps = async function () {
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
