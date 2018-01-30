import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/pages/Dashboard'
import Home from '@/components/pages/Home'
import About from '@/components/pages/About'
import Contact from '@/components/pages/Contact'
import SignIn from '@/components/pages/user/SignIn'
import Cases from '@/components/cases/Cases'
import AddCase from '@/components/cases/AddCase'
import EditCase from '@/components/cases/EditCase'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'c-mainMenu__link--active',
  linkExactActiveClass: '',
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
      component: Home
    },
    {
      path: '/pages/about',
      name: 'About',
      component: About
    },
    {
      path: '/pages/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/cases',
      name: 'Overview',
      component: Cases
    },
    {
      path: '/cases/add',
      name: 'Add case',
      component: AddCase
    },
    {
      path: '/cases/edit/:id',
      name: 'Edit case',
      component: EditCase
    }
  ]
})
