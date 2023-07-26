<template>
  <button class="btn" @click="dialog?.showModal()">Login</button>
  <dialog ref="dialog" @keypress.enter.prevent class="modal">
    <form method="dialog" class="modal-box w-64">
      <h3 class="font-bold text-lg text-center">{{ t('misc.login') }}</h3>
      <div class="pt-6 flex justify-around">
        <button class="btn btn-circle" @click="githubLogin">
          <span class="iconfont cursor-pointer icon-github-fill"></span>
        </button>
        <button class="btn btn-circle" @click="googleLogin">
          <span class="iconfont cursor-pointer icon-google"></span>
        </button>
      </div>
      <div class="modal-action">
        <button class="btn w-full">{{ t('misc.cancel') }}</button>
      </div>
    </form>
  </dialog>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const dialog = ref<HTMLDialogElement | null>(null)
const { t } = useI18n()
const githubLogin = () => {
  location.href = import.meta.env.VITE_API_BASEURL + '/oauth/github/login'
}
const googleLogin = () => {
  location.href = import.meta.env.VITE_API_BASEURL + '/oauth/google/login'
}
</script>
