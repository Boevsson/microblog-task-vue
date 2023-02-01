import $axios from '../plugins/axios'

class PostService {
  getAll () {
    return $axios.get(`/posts`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error
      })
  }
  getOne (id) {
    return $axios.get(`/posts/${ id }`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error
      })
  }  
  create (data) {
    return $axios.post('/posts', data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      throw error
    })
  }
  update (id, data) {
    return $axios.post(`/posts/${ id }`, data)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error
      })
  }
  delete (id) {
    return $axios.delete(`/posts/${ id }`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        throw error
      })
  }
}

export default new PostService()
