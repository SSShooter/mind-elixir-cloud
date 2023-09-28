<template>
  <dialog ref="dialog" @keypress.enter.prevent class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-lg">{{ t('misc.share') }}</h3>
      <div class="pt-6">
        <div class="flex justify-around">
          <button class="btn btn-circle" @click="shareToTwitter">
            <span class="iconfont cursor-pointer icon-twitter"></span>
          </button>
          <button class="btn btn-circle" @click="shareToFacebook">
            <span class="iconfont cursor-pointer icon-facebook"></span>
          </button>
          <button class="btn btn-circle" @click="shareToLinkedin">
            <span class="iconfont cursor-pointer icon-linkedin"></span>
          </button>
          <button class="btn btn-circle" @click="shareToWeibo">
            <span class="iconfont cursor-pointer icon-weibo"></span>
          </button>
          <button class="btn btn-circle" @click="copyLink">
            <span class="iconfont cursor-pointer icon-link"></span>
          </button>
        </div>
        <div class="pt-6">
          Embed Mind Elixir
          <textarea
            class="textarea textarea-bordered block w-full h-32 resize-none mt-2"
            :value="currentEmbed"
          ></textarea>
        </div>
      </div>
      <div class="modal-action">
        <button class="btn">{{ t('misc.cancel') }}</button>
      </div>
    </form>
  </dialog>
</template>
<script setup lang="ts">
import { MindMapItem } from '@/models/list'
import toast from '@/utils/toast'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const dialog = ref<HTMLDialogElement | null>(null)
const { t } = useI18n()

const currentItem = ref<MindMapItem | null>(null)
const currentLink = computed(() => {
  return `${location.origin}/#/share/${currentItem.value?._id}`
})
const currentEmbed = computed(() => {
  return `<iframe src="${currentLink.value}" allowfullscreen="true" style="border:none" width="100%" height="600px"></iframe>`
})
const show = (item: MindMapItem) => {
  dialog.value?.showModal()
  currentItem.value = item
}

const shareToTwitter = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    currentItem.value?.name ?? ''
  )}&url=${encodeURIComponent(currentLink.value)}`
  window.open(url)
}
const shareToFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentLink.value
  )}`
  window.open(url)
}
const shareToLinkedin = () => {}
const shareToWeibo = () => {
  const url = `http://service.weibo.com/share/share.php?title=${encodeURIComponent(
    currentItem.value?.name ?? ''
  )}&url=${encodeURIComponent(currentLink.value)}`
  window.open(url)
}

const copyLink = () => {
  navigator.clipboard.writeText(currentLink.value)
  toast.success('Copied to clipboard')
}

defineExpose({
  show,
})
</script>
