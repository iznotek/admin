<template>
  <div id="app">
    <!-- Remove in production -->
    <div class="layout">
      <input type="checkbox">
      <label></label>
    </div>
    <!-- / -->
    <main-menu />
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
  name: 'app',
  components: {
    'mainMenu': MainMenu
  }
}
</script>

<style src="./assets/css/app.css">
</style>