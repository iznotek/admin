<template>
  <div id="app">
    <div class="layout">
      <input type="checkbox">
      <label></label>
    </div>
    
    <notify type="uploads" />
    <!-- Check possibility to include Modal as well. Emit events? -->

    <transition name="u-slideIn">
      <main-menu v-if="userIsAuthenticated" />
    </transition>
    <main role="main">
      <transition appear name="u-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import MainMenu from '@/components/shared/MainMenu'
import Notify from '@/components/shared/Notify'

export default {
  components: {
    'mainMenu': MainMenu,
    'notify': Notify
  },
  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>

<style src="./assets/css/app.css">
</style>
