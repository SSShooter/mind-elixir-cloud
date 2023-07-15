<template>
  <div class="mt-28">
    <LoadingMask class="pt-20" v-if="loading" />
    <template v-else>
      <div
        class="mx-20 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <RouterLink v-for="map in mapList" :to="`/edit/${map._id}`">
          <MindMapCard
            class="h-full"
            :map="map"
            @delete="deleteMap(map)"
            @download="download(map)"
            @makePublic="makePublic(map)"
          />
        </RouterLink>
      </div>
      <div class="flex justify-center my-8">
        <Pagination
          v-model:page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.total"
        />
      </div>
    </template>
  </div>
  <Teleport to=".navbar-end">
    <CreateButton />
  </Teleport>
  <Teleport to="body">
    <ConfirmModal
      ref="confirmModal"
      title="Warning"
      content="Are you sure to delete this map?"
    />
  </Teleport>
</template>
<script setup lang="ts">
import CreateButton from '@/components/CreateButton.vue'
import MindMapCard from '@/components/MindMapCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingMask from '@/components/LoadingMask.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { reactive, ref, watch } from 'vue'
import { MindMapList, MindMapItem } from '@/models/list'
import { Response } from '@/models/response'
import connect from '@/connect'
import { useRoute } from 'vue-router'

const confirmModal = ref<InstanceType<typeof ConfirmModal> | null>(null)
const route = useRoute()
const mapList = ref<MindMapList>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})
const loading = ref(false)
const fetchList = async () => {
  loading.value = true
  const res = await connect.get<never, Response<MindMapList>>(
    `/api/${route.params.type}`,
    {
      params: {
        pageSize: pagination.pageSize,
        page: pagination.page,
      },
    }
  )
  mapList.value = res.data
  pagination.total = res.total
  loading.value = false
}
watch(
  () => route.params.type,
  async () => {
    pagination.page = 1
    fetchList()
  },
  { immediate: true }
)
watch(
  () => pagination.page,
  async () => {
    fetchList()
  }
)
const deleteMap = async (item: MindMapItem) => {
  await confirmModal.value?.confirm()
  await connect.delete('/api/map/' + item._id)
  fetchList()
}
const makePublic = async (item: MindMapItem) => {
  await connect.patch('/api/map/' + item._id, {
    public: !item.public,
  })
  item.public = !item.public
}
const download = (item: MindMapItem) => {
  // let blob = null
  // const clone = JSON.parse(JSON.stringify(item.content))
  // if (format === 'json') {
  //   blob = new Blob([JSON.stringify(item)])
  // } else if (format === 'html') {
  //   blob = data2Html(clone)
  // } else if (format === 'xmind') {
  //   blob = await data2Xmind(clone)
  // }
  // saveAs(blob, `${item.name}.${format}`)
}
</script>
