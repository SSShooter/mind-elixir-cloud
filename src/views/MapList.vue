<template>
  <div class="mt-28">
    <SearchBar class="mb-5" @search="handleSearch" />
    <!-- 4 conditions: loading/login/public/isListEmpty -->
    <LoadingMask class="pt-20" v-if="loading" />
    <template v-else>
      <div v-if="!userData && !isPublic">
        <div class="text-center text-2xl font-bold">
          Please login to manage your mind maps
        </div>
        <div class="flex justify-center my-8">
          <LoginButton />
        </div>
      </div>
      <div v-else>
        <div
          class="mx-20 grid gap-4 grid-cols-1 auto-rows-[208px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <CreateButton class="h-full" v-if="!isPublic" />
          <RouterLink
            v-for="map in mapList"
            :to="`/${isPublic ? 'share' : 'edit'}/${map._id}`"
          >
            <MindMapCard
              class="h-full"
              :map="map"
              :type="isPublic ? 'public' : 'private'"
              @delete="deleteMap(map)"
              @download="(type) => download(map, type)"
              @makePublic="makePublic(map)"
              @share="share(map)"
            />
          </RouterLink>
        </div>
        <div class="flex justify-center my-8">
          <Pagination
            v-model:page="pagination.page"
            @update:page="fetchList"
            :page-size="pagination.pageSize"
            :total="pagination.total"
          />
        </div>
      </div>
    </template>
    <!-- <div class="flex justify-center items-center" v-else>
      <CreateButton v-if="!isPublic" />
      <img
        v-else
        src="@/assets/create.svg"
        class="h-[33vw]"
        alt="Create Mindmap"
      />
    </div> -->
  </div>
  <Teleport to=".navbar-end" v-if="!isPublic">
    <LogoutButton v-if="userData" />
    <LoginButton v-else />
  </Teleport>
  <Teleport to="body">
    <ConfirmModal
      ref="confirmModal"
      title="Warning"
      content="Are you sure to delete this map?"
    />
    <ShareModal ref="shareModal" />
  </Teleport>
</template>
<script setup lang="ts">
import CreateButton from '@/components/CreateButton.vue'
import LoginButton from '@/components/LoginButton.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import MindMapCard from '@/components/MindMapCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingMask from '@/components/LoadingMask.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import ShareModal from '@/components/ShareModal.vue'
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
import toast from '@/utils/toast'
import SearchBar from '@/components/SearchBar.vue'

const confirmModal = ref<InstanceType<typeof ConfirmModal> | null>(null)
const shareModal = ref<InstanceType<typeof ShareModal> | null>(null)
const route = useRoute()
const isPublic = computed(() => route.params.type === 'public')
const mapList = ref<MindMapList>([])
const pagination = reactive({
  page: 1,
  pageSize: isPublic.value ? 10 : 9,
  total: 0,
})
const keyword = ref('')
const loading = ref(false)
const userData = inject<undefined | User>('userData')
const fetchList = async () => {
  loading.value = true
  const res = await connect
    .get<never, ResponsePagination<MindMapList>>(`/api/${route.params.type}`, {
      params: {
        pageSize: pagination.pageSize,
        page: pagination.page,
        name: keyword.value,
      },
    })
    .catch(() => {
      loading.value = false
      throw new Error('fetch list failed')
    })
  mapList.value =
    res.data?.map((item) => {
      item.clone = JSON.parse(JSON.stringify(item)) as MindMapItem
      return item
    }) || []
  pagination.total = res.total
  loading.value = false
}
watch(
  () => route.params.type,
  async () => {
    keyword.value = ''
    pagination.page = 1
    fetchList()
  },
  { immediate: true }
)
const handleSearch = (val: string) => {
  keyword.value = val
  pagination.page = 1
  fetchList()
}
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
const share = (item: MindMapItem) => {
  shareModal.value?.show(item)
}
const download = async (item: MindMapItem, format: string) => {
  let blob = null
  if (format === 'json') {
    blob = new Blob([JSON.stringify(item.clone)])
  } else if (format === 'html') {
    blob = data2Html(item.clone?.content)
  } else if (format === 'xmind') {
    blob = await data2Xmind(item.clone?.content)
  } else {
    return
  }
  saveAs(blob, `${item.name}.${format}`)
  toast.success('Downloading')
}
</script>
