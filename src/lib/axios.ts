import axios from 'axios'
import router from '@/router'

axios.interceptors.request.use(
  (config) => {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    if (username && password) {
      const credentials = btoa(`${username}:${password}`)
      config.headers['Authorization'] = `Basic ${credentials}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push({ name: 'Login' })
      localStorage.removeItem('username')
      localStorage.removeItem('password')
    }
    return Promise.reject(error)
  },
)

export default axios
