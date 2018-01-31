<template>
  <form class="c-form c-form--checklist" @submit.prevent="submitForm">
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
      <h1>Checklist</h1>
      <ul class="c-checklist__items">
        <li class="c-checklist__item">
          <h2>Description</h2>
          <span v-if="hasText(this.description)">👌</span>
        </li>
        <li class="c-checklist__item">
          <h2>Thumbnail</h2>
          <span v-if="isNotNull(this.thumbnail)">👌</span>
        </li>
        <li class="c-checklist__item">
          <h2>Headline</h2>
          <span v-if="hasText(this.headline)">👌</span>
        </li>
        <li class="c-checklist__item">
          <h2>Summary</h2>
          <span v-if="hasText(this.summary)">👌</span>
        </li>
      </ul>
      <div class="c-form__actions">
        <input class="c-button c-button--save" type="submit" value="Save">
        <input class="c-button c-button--submit" type="submit" value="Publish" :disabled="!formIsValid">
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
  created () {
    console.log(this.caseObj)
  },
  computed: {
    // currentCase () {
    //   return this.$store.getters.loadedCases.filter((item) => {
    //     if (item.id === this.$route.params.id) {
    //       // Check how to deal with this crap
    //       this.id = item.id
    //       this.title = item.title
    //       this.description = item.description
    //       this.thumbnail = !null
    //       this.thumbnailUrl = item.thumbnailUrl
    //       this.headline = item.headline
    //       this.summary = item.summary
    //       return item
    //     }
    //   })
    // },
    formIsValid () {
      return this.hasText(this.description) &&
        this.hasText(this.headline) &&
        this.hasText(this.summary) &&
        this.isNotNull(this.thumbnail)
    }
  },
  data () {
    if (this.formType === 'edit') {
      return {
        title: this.caseObj[0].title,
        titleTip: '<p>Shows up in the browser tab. Replaced by headline if blank.</p>',
        description: '',
        descriptionTip: '<p>Meta description: Describes what the case is about.</p>',
        thumbnail: null,
        thumbnailUrl: '',
        thumbnailTip: '<p>The thumbnail shown on the different pages of the website.</p>',
        headline: '',
        headlineTip: '<p>The headline of the case.</p>',
        summary: '',
        summaryTip: '<p>The summary of the case. What was the challenge? What was the solution?</p>',
        created: ''
      }
    } else {
      return {
        title: '',
        titleTip: '<p>Shows up in the browser tab. Replaced by headline if blank.</p>',
        description: '',
        descriptionTip: '<p>Meta description: Describes what the case is about.</p>',
        thumbnail: null,
        thumbnailUrl: '',
        thumbnailTip: '<p>The thumbnail shown on the different pages of the website.</p>',
        headline: '',
        headlineTip: '<p>The headline of the case.</p>',
        summary: '',
        summaryTip: '<p>The summary of the case. What was the challenge? What was the solution?</p>',
        created: ''
      }
    }
  },
  methods: {
    submitForm () {
      if (!this.formIsValid) {
        return
      }

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
  // watch: {
  //   currentCase (obj) {
  //     if (this.formType === 'edit') {
  //       this.id = obj[0].id
  //       this.title = obj[0].title
  //       this.description = obj[0].description
  //       this.thumbnail = !null
  //       this.thumbnailUrl = obj[0].thumbnailUrl
  //       this.headline = obj[0].headline
  //       this.summary = obj[0].summary
  //     }
  //   }
  // }
}
</script>