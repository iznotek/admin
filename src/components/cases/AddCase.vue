<template>
  <article class="t-page">
    <h1 class="t-page__heading">Add case</h1>
    <div class="t-page__content">
      <form class="c-form" v-on:submit.prevent="submitForm">
        <div class="c-form__fieldsets">
          <!-- Details -->
          <fieldset>
            <legend>Details</legend>
            <div class="c-form__field">
              <div class="c-form__label">
                <label class="c-form__labelName" for="headline">Headline *</label>
                <tool-tip content="<p></p>" />
              </div>
              <input class="c-form__input" type="text" id="headline" v-model="headline" required>
            </div>
            <div class="c-form__field">
              <div class="c-form__label">
                <label class="c-form__labelName" for="summary">Summary *</label>
                <tool-tip content="<p></p>" />
              </div>
              <textarea class="c-form__input" id="summary" v-model="summary" required></textarea>
            </div>
          </fieldset>
          <!-- / Details -->
          <!-- SEO -->
          <fieldset>
            <legend>SEO</legend>
            <div class="c-form__field">
              <div class="c-form__label">
                <label class="c-form__labelName" for="description">Description *</label>
                <tool-tip content="<p>Describes what the page is about. Good for Google.</p>" />
              </div>
              <textarea class="c-form__input" id="description" v-model="description" required></textarea>
            </div>
            <div class="c-form__field">
              <div class="c-form__label">
                <label class="c-form__labelName" for="title">Title</label>
                <tool-tip content="<p>The title shows up in the browser tab.</p>" />
              </div>
              <input class="c-form__input" type="text" id="title" v-model="title">
            </div>
          </fieldset>
          <!-- / SEO -->
        </div>
        <div class="c-form__actions">
          <span>{{title}}</span>
          <input class="c-button c-button--submit" type="submit" value="Publish">
        </div>
      </form>
    </div>
  </article>
</template>

<script>
import Tooltip from '@/components/shared/Tooltip'

export default {
  data () {
    return {
      title: '',
      description: '',
      headline: '',
      summary: ''
    }
  },
  components: {
    'toolTip': Tooltip
  },
  methods: {
    submitForm () {
      if (this.title.trim() === '') {
        this.title = this.headline
        console.log(this.title)
        // push this.title to Firebase
      } else {
        console.log(this.title)
        // push this.title to Firebase
      }
    }
  }
}
</script>