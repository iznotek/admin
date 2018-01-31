import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/pages/Dashboard'
import Home from '@/components/pages/Home'
import About from '@/components/pages/About'
import Contact from '@/components/pages/Contact'
import SignIn from '@/components/pages/user/SignIn'
import Cases from '@/components/cases/Cases'
// import AddCase from '@/components/cases/AddCase'
import AddCaseTest from '@/components/cases/AddCaseTest'
import EditCase from '@/components/cases/EditCase'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'c-mainMenu__link--active',
  linkExactActiveClass: '',
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 300) // Set to CSS transition duration > vue-transitions.css
    })
  },
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/sign-in',
      name: 'Sign in',
      component: SignIn
    },
    {
      path: '/pages/home',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/pages/about',
      name: 'About',
      component: About,
      beforeEnter: AuthGuard
    },
    {
      path: '/pages/contact',
      name: 'Contact',
      component: Contact,
      beforeEnter: AuthGuard
    },
    {
      path: '/cases',
      name: 'Overview',
      component: Cases,
      beforeEnter: AuthGuard
    },
    {
      path: '/cases/add',
      name: 'Add case',
      component: AddCaseTest,
      beforeEnter: AuthGuard
    },
    {
      path: '/edit/:id',
      name: 'Edit case',
      component: EditCase,
      beforeEnter: AuthGuard
    }
  ]
})
