import { store } from '../store'

/**
 * Redirect the user to 'Sign in' route if they're not authenticated
 */
export default (to, from, next) => {
  // Create promise from user action?
  if (store.getters.user) {
    next()
  } else {
    next('/sign-in')
  }
}
