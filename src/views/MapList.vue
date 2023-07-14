<template>
  <div class="mt-28">
    <LoadingMask class="pt-20" v-if="loading" />
    <template v-else>
      <div class="mx-20 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <RouterLink v-for="map in mapList" :to="`/edit/${map._id}`">
          <MindMapCard class="h-full" :map="map" />
        </RouterLink>
      </div>
      <div class="flex justify-center mt-8">
        <Pagination
          v-model:page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.total"
        />
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import MindMapCard from '@/components/MindMapCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingMask from '@/components/LoadingMask.vue'
import { reactive, ref, watch } from 'vue'
import { MindMapList } from '@/models/list'
import { Response } from '@/models/response'
import connect from '@/connect'
import { useRoute } from 'vue-router'

const route = useRoute()
const mapList = ref<MindMapList>([])
const pagination = reactive({
  page: 1,
  pageSize: 2,
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
</script>
