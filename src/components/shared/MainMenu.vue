<template>
  <header class="c-mainMenu">
    <nav class="c-mainMenu__nav">
      <router-link to="/" exact>
        <h1 class="c-mainMenu__title">Admin</h1>
      </router-link>
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
      <button class="c-button" @click="logOut">Log out</button>
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
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
      this.$router.push('/sign-in')
    }
  }
}
</script>