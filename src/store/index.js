import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'
import cases from './cases'
import posts from './posts'
import user from './user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    shared: shared,
    cases: cases,
    posts: posts,
    user: user
  }
})
