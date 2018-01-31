<template>
  <article class="t-page">
    <h1 class="t-page__heading">Edit case</h1>
    <div class="t-page__content">
      <case-form formType="edit" :caseObj="currentCase"/>
    </div>
  </article>
</template>

<script>
import CaseForm from '@/components/cases/CaseForm'

export default {
  components: {
    'caseForm': CaseForm
  },
  computed: {
    currentCase () {
      return this.$store.getters.loadedCases.filter((item) => {
        if (item.id === this.$route.params.id) {
          return item
        }
      })
    }
  },
  watch: {
    currentCase (obj) {
      this.id = obj[0].id
      this.title = obj[0].title
      this.description = obj[0].description
      this.thumbnail = !null
      this.thumbnailUrl = obj[0].thumbnailUrl
      this.headline = obj[0].headline
      this.summary = obj[0].summary
    }
  }
}
</script>