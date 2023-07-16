import axios from 'axios'
// import { Message } from 'element-ui'
// import i18n from './main'

const relink = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
})
// relink.interceptors.request.use(function () {/*...*/ });
relink.interceptors.response.use(
  function (res) {
    return res.data
  },
  function (error) {
    if (error.response.status !== 401) {
      // Message.error(i18n.t('misc.networkError'))
    }
    return Promise.reject(error)
  }
)

export default relink
