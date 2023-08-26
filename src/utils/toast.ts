import { createApp, reactive } from 'vue'
import Toast from '@/components/Toast.vue'

const toast = createApp(Toast)
const toastProps = reactive({
  type: 'success',
  text: '',
  show: false,
})
toast.provide('props', toastProps)
const toastDom = toast.mount(document.createElement('div'))
document.body.appendChild(toastDom.$el)
const showToast = (type: string, text: string, duration: number) => {
  toastProps.type = type
  toastProps.text = text
  toastProps.show = true
  setTimeout(() => {
    toastProps.show = false
  }, duration)
}

export default {
  warning: (text: string, duration = 2000) => {
    showToast('warning', text, duration)
  },
  success: (text: string, duration = 2000) => {
    showToast('success', text, duration)
  },
  error: (text: string, duration = 2000) => {
    showToast('error', text, duration)
  },
}
