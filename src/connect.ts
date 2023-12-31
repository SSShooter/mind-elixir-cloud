import axios from 'axios'
// import { Message } from 'element-ui'
import i18n from './i18n'
import toast from './utils/toast'

const relink = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
})

relink.interceptors.response.use(
  function (res) {
    return res.data
  },
  function (error) {
    if (error.response.status !== 401) {
      toast.error(i18n.global.t('misc.networkError'))
    }
    return Promise.reject(error)
  }
)

export default relink
