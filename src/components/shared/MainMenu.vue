<template>
  <header class="c-mainMenu">
    <nav class="c-mainMenu__nav">
      <div class="c-mainMenu__user">
        <router-link class="c-mainMenu__userIcon" to="/" exact>
          <h1 class="c-mainMenu__userName">CN</h1>
        </router-link>
        <dropdown>
          <button class="c-button c-button--light">Settings</button>
          <button class="c-button c-button--light" @click="logOut">Log out</button>
        </dropdown>
      </div>
      <div class="c-mainMenu__section">
        <h2 class="c-mainMenu__subtitle">Pages</h2>
        <ul>
          <li v-for="(link, i) in pagesLinks" :key="i">
            <router-link class="c-mainMenu__link" :to="link.path" exact>{{link.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="c-mainMenu__section">
        <h2 class="c-mainMenu__subtitle">Work</h2>
        <ul>
          <li v-for="(link, i) in casesLinks" :key="i">
            <router-link class="c-mainMenu__link" :to="link.path" exact>{{link.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="c-mainMenu__section">
        <h2 class="c-mainMenu__subtitle">Blog</h2>
        <ul>
          <li v-for="(link, i) in blogLinks" :key="i">
            <router-link class="c-mainMenu__link" :to="link.path" exact>{{link.name}}</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import Dropdown from '@/components/shared/Dropdown'

export default {
  data () {
    return {
      actions: [{
        type: 'button',
        name: 'Log out',
        action: 'logOut'
      }]
    }
  },
  components: {
    'dropdown': Dropdown
  },
  computed: {
    blogLinks () {
      return this.$router.options.routes.filter(item => this.getMenuRoutes(item, 'posts'))
    },
    casesLinks () {
      return this.$router.options.routes.filter(item => this.getMenuRoutes(item, 'cases'))
    },
    pagesLinks () {
      return this.$router.options.routes.filter(item => this.getMenuRoutes(item, 'pages'))
    }
  },
  methods: {
    getMenuRoutes (item, name) {
      if (item.path.indexOf(name) !== -1 && !item.path.match('edit')) {
        return item
      }
    },
    logOut () {
      this.$store.dispatch('logOut')
      this.$router.push('/sign-in')
    }
  }
}
</script>