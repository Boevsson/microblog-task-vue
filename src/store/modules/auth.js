import VueCookies from 'vue-cookies'
import AuthService from '@/services/auth.service'

const state = () => ({
  user: null
})

const getters = {
  isAuthenticated () {
    let cookie = VueCookies.get('current_user')

    return cookie != null
  },

  getCurrentUser (state) {
    return state.user
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },

  signOut (state) {
    state.user = null
    VueCookies.remove('current_user', null)
  }
}

const actions = {
  getMe (vuexContext) {
    
    return AuthService.getMe().then(data => {
      
      vuexContext.commit('setUser', data)
    }).catch((error) => {
      vuexContext.dispatch('snackbar/showSnackbarMessage', {
          message: error,
          duration: 8000,
          mode: 'fail'
      })
    })
  },
  
  async login (vuexContext, data) {
    try {
      const response = await AuthService.login(data)

      VueCookies.set('current_user', response.access_token)
      vuexContext.commit('setUser', response.user)
    } catch (error) {
      console.log(error)
    }
  },
  
  async signOut (vuexContext) {
    vuexContext.commit('signOut')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
