<template>
  <article class="t-page">
    <header class="t-page__header">
        <h1 class="t-page__heading">{{this.$route.name}} <small>({{cases.length}})</small></h1>
        <div>
          <button class="c-toggleBtn c-toggleBtn--active" @click="displayAs('grid', $event)">Grid</button>
          <button class="c-toggleBtn" @click="displayAs('list', $event)">List</button>
        </div>
    </header>
    <div class="t-page__content" :class="{'t-page__content--grid': grid, 't-page__content--list': list}">
      <article class="c-card" v-for="(item, i) in cases" :key="i">
        <header class="c-card__header">
          <h1>
            <router-link :to="`/edit/${item.id}`" exact>{{item.headline}}</router-link>
          </h1>
          <time class="c-card__date" :datetime="item.created">{{formatDate(item.created)}}</time>
          <!-- Published? ^^^ -->
        </header>
        <router-link :to="`/edit/${item.id}`" exact>
          <lazy-image :classes="'c-card__thumbnail'" :src="item.thumbnailUrl" :alt="item.headline" />
        </router-link>
        <router-link class="c-button" :to="`/edit/${item.id}`" exact>Edit</router-link>
      </article>
    </div>
  </article>
</template>

<script>
import { formatDate } from '@/components/mixins/formatDate'
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
  },
  mixins: [formatDate]
}
</script>