import axios from 'axios'
import authApi from '@/features/auth/api/auth'

interface QueueItem {
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  httpsAgent: new (require('https').Agent)({
    rejectUnauthorized: false
  })
})

let isRefreshing = false
let failedQueue: QueueItem[] = []

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })
  failedQueue = []
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { accessToken } = await authApi.refresh()
        localStorage.setItem('token', accessToken)
        
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        processQueue()
        
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as Error)
        localStorage.removeItem('token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
