<template>
  <article class="t-page">
    <header class="t-page__header">
        <h1 class="t-page__heading">{{this.$route.name}} <small>({{cases.length}})</small></h1>
        <toggle :buttons="displayBtns" @toggle="switchDisplay"/>
    </header>
    <div class="t-page__content" :class="{'t-page__content--grid': grid, 't-page__content--list': list}">
      <article class="c-card" v-for="(item, i) in cases" :key="i">
        <header class="c-card__header">
          <h1>
            <router-link :to="`/cases/edit/${item.id}`" exact>{{item.headline}}</router-link>
          </h1>
          <time class="c-card__date" :datetime="item.created">{{formatDate(item.created)}}</time>
          <!-- Published date? ^^^ -->
        </header>
        <router-link :to="`/cases/edit/${item.id}`" exact>
          <lazy-image :classes="'c-card__thumbnail'" :src="item.thumbnailUrl" :alt="item.headline" />
        </router-link>
        <div class="c-card__actions">
          <router-link class="c-button c-button--l" :to="`/cases/edit/${item.id}`" exact>Edit</router-link>
          <button class="c-button c-button--secondary">Delete</button>
        </div>
      </article>
    </div>
  </article>
</template>

<script>
import { formatDate } from '@/components/mixins/formatDate'
import LazyImage from '@/components/shared/LazyImage'
import Toggle from '@/components/shared/Toggle'

export default {
  components: {
    'lazyImage': LazyImage,
    'toggle': Toggle
  },
  computed: {
    // Look into possibility to merge cases overview and posts overview in a more generic
    // component. If design is the same though.
    cases () {
      return this.$store.getters.loadedCases
    }
  },
  data () {
    return {
      displayBtns: [
        { type: 'grid', active: true },
        { type: 'list' }
      ],
      grid: true,
      list: false
    }
  },
  methods: {
    switchDisplay (type) {
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