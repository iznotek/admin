<template>
  <article class="t-page">
    <header class="t-page__header">
      <h1 class="t-page__heading">{{this.$route.name}}</h1>
    </header>
    <div class="t-page__content">
      <post-form formType="edit" />
    </div>
  </article>
</template>

<script>
import PostForm from '@/components/posts/PostForm'

export default {
  components: {
    'postForm': PostForm
  }
}
</script>