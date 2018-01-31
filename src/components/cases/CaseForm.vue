<template>
  <form class="c-form c-form--checklist"> 
    <!-- @submit.prevent="submitForm" -->
    <div class="c-form__fieldsets">
      <!-- SEO -->
      <fieldset>
        <legend>SEO</legend>
        <div class="c-form__field">
          <div class="c-form__label">
            <label class="c-form__labelName" for="title">Title</label>
            <tool-tip :content="titleTip" />
          </div>
          <input class="c-form__input" type="text" id="title" 
            v-model="title" 
            @focus="resetLabel"
            @blur="checkLabel">
        </div>
        <div class="c-form__field">
          <div class="c-form__label">
            <label class="c-form__labelName" for="description">Description *</label>
            <tool-tip :content="descriptionTip" />
          </div>
          <textarea class="c-form__input" id="description" 
            v-model="description"
            @focus="resetLabel" 
            @blur="checkLabel"></textarea>
        </div>
      </fieldset>
      <!-- / SEO -->
      <!-- Details -->
      <fieldset>
        <legend>Details</legend>
        <div class="c-form__field">
          <div class="c-form__label">
            <label class="c-form__labelName" for="thumbnail">Thumbnail *</label>
            <tool-tip :content="thumbnailTip" />
          </div>
          <div class="c-form__input c-form__input--file">
            <input type="file" id="thumbnail" @change="handleFile">
            <img :src="thumbnailUrl">
          </div>
        </div>
        <div class="c-form__field">
          <div class="c-form__label">
            <label class="c-form__labelName" for="headline">Headline *</label>
            <tool-tip :content="headlineTip" />
          </div>
          <input class="c-form__input" type="text" id="headline" 
            v-model="headline"
            @focus="resetLabel" 
            @blur="checkLabel">
        </div>
        <div class="c-form__field">
          <div class="c-form__label">
            <label class="c-form__labelName" for="summary">Summary *</label>
            <tool-tip :content="summaryTip" />
          </div>
          <textarea class="c-form__input" id="summary" rows="6"
            v-model="summary"
            @focus="resetLabel" 
            @blur="checkLabel"></textarea>
        </div>
      </fieldset>
      <!-- / Details -->
    </div>
    <aside class="c-checklist">
      <header class="c-checklist__header">
        <h1>Case</h1>
        <small>Show progress</small>
      </header>
      <ul class="c-checklist__items">
        <li class="c-checklist__item">
          <h2>Description</h2>
          <span v-if="hasText(this.description)">&#10003;</span>
        </li>
        <li class="c-checklist__item">
          <h2>Thumbnail</h2>
          <span v-if="isNotNull(this.thumbnail)">&#10003;</span>
        </li>
        <li class="c-checklist__item">
          <h2>Headline</h2>
          <span v-if="hasText(this.headline)">&#10003;</span>
        </li>
        <li class="c-checklist__item">
          <h2>Summary</h2>
          <span v-if="hasText(this.summary)">&#10003;</span>
        </li>
      </ul>
      <div class="c-form__actions">
        <!-- <input class="c-link c-link--delete" type="submit" value="Delete"> -->
        <!-- <input class="c-link c-link--save" type="submit" value="Save"> -->
        <input class="c-button c-button--submit" type="submit" value="Publish" data-action="publish"
          :disabled="!formIsValid"
          @click.prevent="submitForm">
      </div>
    </aside>
  </form>
</template>

<script>
import Tooltip from '@/components/shared/Tooltip'
import { handleFile } from '@/components/mixins/handleFile'
import { labelTransform } from '@/components/mixins/labelTransform'

export default {
  components: {
    'toolTip': Tooltip
  },
  computed: {
    formIsValid () {
      return this.hasText(this.description) &&
        this.hasText(this.headline) &&
        this.hasText(this.summary) &&
        this.isNotNull(this.thumbnail)
    }
  },
  data () {
    // Fix this crap below if reload Edit page. Promise on action?
    return {
      id: this.formType === 'edit' ? this.caseObj[0].id : '',
      title: this.caseObj[0].title,
      titleTip: '<p>Shows up in the browser tab. Replaced by headline if blank.</p>',
      description: this.caseObj[0].description,
      descriptionTip: '<p>Meta description: Describes what the case is about.</p>',
      thumbnail: this.formType === 'edit' ? !null : null,
      thumbnailUrl: this.caseObj[0].thumbnailUrl,
      thumbnailTip: '<p>The thumbnail shown on the different pages of the website.</p>',
      headline: this.caseObj[0].headline,
      headlineTip: '<p>The headline of the case.</p>',
      summary: this.caseObj[0].summary,
      summaryTip: '<p>The summary of the case. What was the challenge? What was the solution?</p>',
      created: this.caseObj[0].created
    }
  },
  methods: {
    publishCase () {
      if (this.formType === 'edit') {
        const caseData = {
          id: this.id,
          title: this.title,
          description: this.description,
          headline: this.headline,
          summary: this.summary
          // Published flag?
        }

        if (typeof this.thumbnail === 'object') {
          caseData.thumbnail = this.thumbnail
        }

        this.$store.dispatch('updateCase', caseData)
        this.$router.push('/cases')
      } else {
        const caseData = {
          title: this.hasText(this.title) ? this.title : this.title = this.headline,
          description: this.description,
          thumbnail: this.thumbnail,
          headline: this.headline,
          summary: this.summary,
          created: new Date()
          // Published flag?
        }

        this.$store.dispatch('addCase', caseData)
        this.$router.push('/cases')
      }
    },
    submitForm (e) {
      if (!this.formIsValid) {
        return
      }

      if (e.target.dataset.action === 'publish') {
        this.publishCase()
      }
    }
  },
  mixins: [handleFile, labelTransform],
  mounted () {
    if (this.formType === 'edit') {
      const labels = [].slice.call(this.$el.querySelectorAll('.c-form__labelName'))
      labels.map(label => label.classList.add('u-isUntransformed'))
    }
  },
  props: ['formType', 'caseObj']
}
</script>