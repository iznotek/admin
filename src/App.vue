<template>
  <div id="app">
    <!-- Remove in production -->
    <div class="layout">
      <input type="checkbox">
      <label></label>
    </div>
    <!-- / Remove -->
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

export default {
  components: {
    'mainMenu': MainMenu
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
