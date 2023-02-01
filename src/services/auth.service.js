import $axios from '../plugins/axios'

class AuthService {
  login (data) {
    return $axios.post(`login`, data)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error
      })
  }
  
  getMe () {
    
    return $axios.get('me')
    .then((res) => {
      
      return res.data
    }).catch((error) => {
      
      throw error
    })
  }
}

export default new AuthService()
