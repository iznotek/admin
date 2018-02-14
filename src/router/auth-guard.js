import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.user) {
    console.log('to: ', to)
    // console.log('from: ', from)
    // console.log('next: ', next)
    next()
  } else {
    console.log('no user')
    next('/sign-in')
  }
}
