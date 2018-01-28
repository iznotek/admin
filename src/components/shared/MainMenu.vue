<template>
  <header class="c-mainMenu" v-if="userIsAuthenticated">
    <nav class="c-mainMenu__nav">
      <h1 class="c-mainMenu__title">
        <router-link to="/" exact>Client</router-link>
      </h1>
      <div class="c-mainMenu__section">
        <h2 class="c-mainMenu__subtitle">Pages</h2>
        <ul>
          <li v-for="(link, i) in pagesLinks" :key="i">
            <router-link class="c-mainMenu__link" :to="link.path" exact>{{link.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="c-mainMenu__section">
        <h2 class="c-mainMenu__subtitle">Cases</h2>
        <ul>
          <li v-for="(link, i) in casesLinks" :key="i">
            <router-link class="c-mainMenu__link" :to="link.path" exact>{{link.name}}</router-link>
          </li>
        </ul>
      </div>
      <!-- Dropdown component + User indicator -->
      <router-link @click="onLogOut" to="/sign-in" exact>Log out</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    casesLinks () {
      return this.$router.options.routes.filter((item) => {
        if (item.path.indexOf('cases') !== -1) {
          return item
        }
      })
    },
    pagesLinks () {
      return this.$router.options.routes.filter((item) => {
        if (item.path.indexOf('pages') !== -1) {
          return item
        }
      })
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogOut () {
      this.$store.dispatch('logOut')
      console.log(this.userIsAuthenticated)
    }
  }
}
</script>