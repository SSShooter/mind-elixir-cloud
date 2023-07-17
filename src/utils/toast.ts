import { createApp } from 'vue'
import Toast from '@/components/Toast.vue'

const toast = createApp(Toast, {
  type: 'success',
  text: '',
  show: false,
})

const toastDom = toast.mount(document.createElement('div'))
document.body.appendChild(toastDom.$el)
const showToast = (type: string, text: string, duration: number) => {
  if (!toast._instance) return
  toast._instance.props.type = type
  toast._instance.props.text = text
  toast._instance.props.show = true
  setTimeout(() => {
    if (!toast._instance) return
    toast._instance.props.show = false
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
