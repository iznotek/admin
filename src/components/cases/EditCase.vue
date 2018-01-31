<template>
  <article class="t-page">
    <header class="t-page__header">
      <h1 class="t-page__heading">{{this.$route.name}}</h1>
    </header>
    <div class="t-page__content">
      <case-form formType="edit" />
    </div>
  </article>
</template>

<script>
import CaseForm from '@/components/cases/CaseForm'

export default {
  components: {
    'caseForm': CaseForm
  }
}
</script>