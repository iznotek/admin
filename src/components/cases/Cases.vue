<template>
  <article class="t-page">
    <h1 class="t-page__heading">Cases</h1>
    <div class="t-page__content">
      <ul>
        <li v-for="(item, i) in cases" :key="i">
          <article class="c-card">
            <h1 class="c-card__headline">{{item.headline}}</h1>
            <img class="c-card__thumbnail" :src="item.thumbnailUrl" :alt="item.headline">
          </article>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  computed: {
    cases () {
      return this.$store.getters.loadedCases
    }
  }
}
</script>