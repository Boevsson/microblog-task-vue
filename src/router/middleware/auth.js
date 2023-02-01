import VueCookies from 'vue-cookies'

export default async function auth ({ next, store, nextMiddleware }) {
  let isAuthenticated = VueCookies.get('current_user') != null

  if (!isAuthenticated) {
    return next({
      path: '/login'
    })
  }

  let user = store.getters['auth/getCurrentUser']

  if (user === null) {
    await store.dispatch('auth/getMe')
  }

  return nextMiddleware()
}
