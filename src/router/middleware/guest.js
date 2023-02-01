import VueCookies from 'vue-cookies'

export default function guest ({ next, nextMiddleware }) {
  let isAuthenticated = VueCookies.get('current_user') != null

  console.log(isAuthenticated)
  
  if (isAuthenticated) {
    let path = 'dashboard'
    return next({ path: path })
  }

  return nextMiddleware()
}
