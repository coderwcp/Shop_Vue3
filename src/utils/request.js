import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  instance.interceptors.request.use(
    config => config,
    error => error
  )

  instance.interceptors.response.use(
    data => data.data,
    error => Promise.reject(error)
  )

  return instance(config)
}
