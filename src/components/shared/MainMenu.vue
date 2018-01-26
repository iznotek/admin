<template>
  <header class="c-mainMenu">
    <nav class="c-mainMenu__nav">
      <h1 class="c-mainMenu__title">
        <router-link to="/" exact>Admin</router-link>
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
      <!-- <li><router-link v-if="!this.userIsAuthenticated" to="/sign-in" exact>Sign in</router-link></li> -->
      <!-- <li><button v-if="this.userIsAuthenticated" @click="onLogOut">Log out</button></li> -->
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
  }
}
</script>