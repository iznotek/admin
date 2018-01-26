import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/pages/Home'
import About from '@/components/pages/About'
import Cases from '@/components/cases/Cases'
import AddCase from '@/components/cases/AddCase'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'u-is-active',
  linkExactActiveClass: '',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
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
      path: '/cases',
      name: 'Overview',
      component: Cases
    },
    {
      path: '/cases/add',
      name: 'Add case',
      component: AddCase
    }
  ]
})
