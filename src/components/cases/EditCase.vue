<template>
  <article class="t-page">
    <h1 class="t-page__heading">Edit case</h1>
    <div class="t-page__content">
      <!-- Pass down post, like imagePosts > imagePost > printForm -->
      <case-form formType="edit"/>
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