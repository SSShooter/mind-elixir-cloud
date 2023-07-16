<template>
  <div class="mt-28">
    <LoadingMask class="pt-20" v-if="loading" />
    <template v-else>
      <div
        class="mx-20 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <RouterLink
          v-for="map in mapList"
          :to="`/${isPublic ? 'share' : 'edit'}/${map._id}`"
        >
          <MindMapCard
            class="h-full"
            :map="map"
            @delete="deleteMap(map)"
            @download="download(map, 'json')"
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
  <Teleport to=".navbar-end" v-if="!isPublic">
    <LogoutButton v-if="userData" />
    <LoginButton v-else />
    <!-- <CreateButton  /> -->
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
// import CreateButton from '@/components/CreateButton.vue'
import LoginButton from '@/components/LoginButton.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import MindMapCard from '@/components/MindMapCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingMask from '@/components/LoadingMask.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { reactive, ref, watch, inject, computed } from 'vue'
import { User } from '@/models/user'
import { MindMapList, MindMapItem } from '@/models/list'
import { ResponsePagination } from '@/models/response'
import connect from '@/connect'
import { useRoute } from 'vue-router'
// @ts-ignore
import { saveAs } from 'file-saver'
// @ts-ignore
import { data2Xmind } from '@mind-elixir/export-xmind'
// @ts-ignore
import { data2Html } from '@mind-elixir/export-html'

const confirmModal = ref<InstanceType<typeof ConfirmModal> | null>(null)
const route = useRoute()
const isPublic = computed(() => route.params.type === 'public')
const mapList = ref<MindMapList>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})
const loading = ref(false)
const userData = inject<undefined | User>('userData')
const fetchList = async () => {
  loading.value = true
  const res = await connect.get<never, ResponsePagination<MindMapList>>(
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
const download = async (item: MindMapItem, format: string) => {
  let blob = null
  const clone = JSON.parse(JSON.stringify(item.content))
  if (format === 'json') {
    blob = new Blob([JSON.stringify(item)])
  } else if (format === 'html') {
    blob = data2Html(clone)
  } else if (format === 'xmind') {
    blob = await data2Xmind(clone)
  } else {
    return
  }
  saveAs(blob, `${item.name}.${format}`)
}
</script>
