import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../router'

let $axios = axios.create({
  baseURL: `http://localhost:8080`,
  withCredentials: false
})

$axios.interceptors.request.use(
  (config) => {
    let cookie = VueCookies.get('current_user')

    if (cookie) {
      config.headers.Authorization = `Bearer ${ VueCookies.get('current_user') }`
    }
    // config.headers.Cookie = `current_user=${Cookie.get('current_user')}`;
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

$axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    
    if (error.response.status === 401) {
      
      VueCookies.remove('current_user')

      if (router.currentRoute.path !== '/login') {
        
        router.push('/login')
      }
    }

    return Promise.reject(error)
  }
)

export default $axios
