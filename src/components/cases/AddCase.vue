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
                <tool-tip :content="headlineTip" />
              </div>
              <input class="c-form__input" type="text" id="headline" 
                v-model="headline"
                @focus="resetTranform" 
                @blur="checkForTransform">
            </div>
            <div class="c-form__field">
              <div class="c-form__label">
                <label class="c-form__labelName" for="summary">Summary *</label>
                <tool-tip :content="summaryTip" />
              </div>
              <textarea class="c-form__input" id="summary" rows="6"
                v-model="summary"
                @focus="resetTranform" 
                @blur="checkForTransform"></textarea>
            </div>
          </fieldset>
          <!-- / Details -->
          <!-- SEO -->
          <fieldset>
            <legend>SEO</legend>
            <div class="c-form__field">
              <div class="c-form__label">
                <label class="c-form__labelName" for="description">Description *</label>
                <tool-tip :content="descriptionTip" />
              </div>
              <textarea class="c-form__input" id="description" 
                v-model="description"
                @focus="resetTranform" 
                @blur="checkForTransform"></textarea>
            </div>
            <div class="c-form__field">
              <div class="c-form__label">
                <label class="c-form__labelName" for="title">Title</label>
                <tool-tip :content="titleTip" />
              </div>
              <input class="c-form__input" type="text" id="title" 
                v-model="title" 
                @focus="resetTranform" 
                @blur="checkForTransform">
            </div>
          </fieldset>
          <!-- / SEO -->
        </div>
        <aside class="c-checklist">
          <h1>Checklist</h1>
          <ul class="c-checklist__items">
            <!-- Loop through required fields? -->
            <li class="c-checklist__item">
              <h2>Headline</h2>
              <span v-if="hasContent(this.headline)">&#10003;</span>
            </li>
            <li class="c-checklist__item">
              <h2>Description</h2>
              <span v-if="hasContent(this.description)">&#10003;</span>
            </li>
            <!-- / -->
          </ul>
          <input class="c-button c-button--submit" type="submit" value="Publish">
        </aside>
      </form>
    </div>
  </article>
</template>

<script>
import Tooltip from '@/components/shared/Tooltip'

export default {
  components: {
    'toolTip': Tooltip
  },
  data () {
    return {
      title: '',
      titleTip: '<p>The title shows up in the browser tab.</p>',
      description: '',
      descriptionTip: '<p>Describes what the case is about.</p>',
      headline: '',
      headlineTip: '',
      summary: '',
      summaryTip: ''
    }
  },
  methods: {
    checkForTransform (e) {
      const elm = e.currentTarget
      const label = elm.parentNode.querySelector('label')

      this.hasContent(elm.value)
        ? label.classList.add('u-isUntransformed')
        : label.classList.remove('u-isUntransformed')
    },
    hasContent (field) {
      if (field.trim() !== '') {
        return true
      }
    },
    resetTranform (e) {
      const label = e.currentTarget.parentNode.querySelector('label')
      label.classList.add('u-isUntransformed')
    },
    submitForm () {
      // Show errors for required fields

      // Remove errors for required fields afterwards

      if (this.hasContent(this.title)) {
        console.log(this.title)
        // push this.title to Firebase
      } else {
        this.title = this.headline
        console.log(this.title)
        // push this.title to Firebase
      }
    }
  }
}
</script>