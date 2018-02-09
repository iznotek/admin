<template>
  <!-- Holds Uploads, Errors ... -->
  <aside class="notification" v-if="type === 'uploads' && uploads !== null">
    <header>
      <h1>Uploads</h1>
      <button>Close</button>
    </header>
    <ul>
      <li v-for="(item, i) in uploads" :key="i">
        <!-- Maybe control the display over here. If item.name is new, show new li.
        Else only update the progress -->
        <div>{{i}}</div>
        <!-- Use i, update visuals per i -->
        <span>{{item.name}}</span> - <span>{{item.progress}}</span>
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
  },
  props: ['type'],
  watch: {
    uploads () {
      console.log(this.uploads)
      // const test = this.uploads

      // test.forEach((item) => {
      //   const obj = Object.assign({}, ...test)
      //   console.log(obj)
      // })
    }
  }
}
</script>

<style scoped>
  .notification {
    position: fixed;
    z-index: 10;
    right: 3rem;
    bottom: 3rem;
    padding: 1.5rem;
    background-color: red;
  }
</style>
