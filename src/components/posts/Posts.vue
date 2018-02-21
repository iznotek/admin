<template>
  <article class="t-page">
    <header class="t-page__header">
        <h1 class="t-page__heading">{{this.$route.name}} <small>({{posts.length}})</small></h1>
        <toggle :buttons="displayBtns" @toggle="switchDisplay"/>
    </header>
    <div class="t-page__content" :class="{'t-page__content--grid': grid, 't-page__content--list': list}">
      <article class="c-card" v-for="(item, i) in posts" :key="i">
        <header class="c-card__header">
          <h1>
            <router-link :to="`/posts/edit/${item.id}`" exact>{{item.title}}</router-link>
          </h1>
          <time class="c-card__date" :datetime="item.created">{{formatDate(item.created)}}</time>
          <!-- Published date? ^^^ -->
        </header>
        <router-link :to="`/posts/edit/${item.id}`" exact>
          <lazy-image :classes="'c-card__thumbnail'" :src="item.thumbnailUrl" :alt="item.title" />
        </router-link>
        <div class="c-card__actions">
          <router-link class="c-button c-button--l" :to="`/posts/edit/${item.id}`" exact>Edit</router-link>
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
    posts () {
      return this.$store.getters.loadedPosts
    }
  },
  data () {
    return {
      displayBtns: [
        { type: 'grid' },
        { type: 'list', active: true }
      ],
      grid: false,
      list: true
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