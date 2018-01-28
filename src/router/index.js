import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/pages/Dashboard'
import Home from '@/components/pages/Home'
import About from '@/components/pages/About'
import Contact from '@/components/pages/Contact'
import SignInUser from '@/components/pages/user/SignInUser'
import Cases from '@/components/cases/Cases'
import AddCase from '@/components/cases/AddCase'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'u-is-active',
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
      component: SignInUser
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
      component: AddCase,
      beforeEnter: AuthGuard
    }
  ]
})
