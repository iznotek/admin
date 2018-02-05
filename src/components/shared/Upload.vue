<template>
  <aside v-if="uploads !== null">
    <ul>
      <li v-for="(item, i) in uploads" :key="i">
        <div>{{item.name}}</div>
        <div>{{item.progress}}</div>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  computed: {
    uploads () {
      return this.$store.getters.uploads
    }
  }
}
</script>

<style scoped>
  aside {
    position: fixed;
    right: 3rem;
    bottom: 3rem;
    padding: 1.5rem;
    background-color: red;
  }
</style>
