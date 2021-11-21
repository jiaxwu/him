import Axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://localhost:8080'

const axios = Axios.create({
  baseURL,
  timeout: 20000
})

axios.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios Error]`, error.response)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default axios