<template>
  <article class="t-page">
    <header>
        <h1 class="t-page__heading">Cases <small>({{cases.length}})</small></h1>
        <div>
          <button class="c-toggleBtn c-toggleBtn--active" @click="displayAs('grid', $event)">Grid</button>
          <button class="c-toggleBtn" @click="displayAs('list', $event)">List</button>
        </div>
    </header>
    <div class="t-page__content" :class="{'t-page__content--grid': grid, 't-page__content--list': list}">
      <article class="c-card" v-for="(item, i) in cases" :key="i">
        <router-link :to="`/cases/edit/${item.id}`" exact>
          <h1 class="c-card__headline">{{item.headline}}</h1>
        </router-link>
        <lazy-image :classes="'c-card__thumbnail'" :src="item.thumbnailUrl" :alt="item.headline" />
      </article>
    </div>
  </article>
</template>

<script>
import LazyImage from '@/components/shared/LazyImage'

export default {
  components: {
    'lazyImage': LazyImage
  },
  computed: {
    cases () {
      return this.$store.getters.loadedCases
    }
  },
  data () {
    return {
      grid: true,
      list: false
    }
  },
  methods: {
    displayAs (type, e) {
      const btn = e.currentTarget
      const activeClass = 'c-toggleBtn--active'

      btn.parentNode.querySelector(`.${activeClass}`).classList.remove(`${activeClass}`)
      btn.classList.add(`${activeClass}`)

      if (type === 'grid') {
        this.grid = true
        this.list = false
      } else if (type === 'list') {
        this.grid = false
        this.list = true
      }
    }
  }
}
</script>