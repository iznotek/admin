<template>
  <article class="t-page">
    <h1 class="t-page__heading">Add case</h1>
    <div class="t-page__content">
      <case-form formType="add" :caseObj="emptyCase"/>
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
    emptyCase () {
      console.log('from Add')
      return {
        title: '',
        description: '',
        thumbnail: null,
        thumbnailUrl: '',
        headline: '',
        summary: ''
      }
    }
  }
}
</script>