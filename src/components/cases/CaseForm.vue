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
            <input type="file" id="thumbnail" @change="handleFile($event, 'thumbnail')">
            <img class="c-form__thumbnail" :src="thumbnailUrl">
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
      <!-- Content -->
      <fieldset>
        <legend>Content</legend>
        <div class="c-form__field">
          <button @click.prevent="addContentField('image')">Add image</button>
          <!-- <tool-tip :content="contentTip" /> -->
          <ul>
            <li class="c-form__input c-form__input--file" v-for="(row, i) in content" :key="i">
              <label class="c-form__label" :for="`contentFile--${i}`">
                <img class="c-form__thumbnail c-form__thumbnail--s" :src="row.src">
                <span>{{row.name || 'Select file'}}</span>
              </label>
              <input type="file" :id="`contentFile--${i}`" @change="handleContentFile($event, row, i)">
              <button class="c-button c-button--input" v-on:click.prevent="removeElement(i)">X</button>
            </li>
          </ul>
        </div>
      </fieldset>
      <!-- / Content -->
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
        <input class="c-link c-link--delete" type="submit" value="Delete" data-action="delete"
          v-if="formType === 'edit'"
          @click.prevent="submitForm">
        <input class="c-link c-link--save" type="submit" value="Save" data-action="save"
          @click.prevent="submitForm">
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
import { transformLabel } from '@/components/mixins/transformLabel'

export default {
  components: {
    'toolTip': Tooltip
  },
  computed: {
    currentCase () {
      if (this.formType === 'edit') {
        return this.$store.getters.loadedCases.filter((item) => {
          if (item.id === this.$route.params.id) {
            this.id = item.id
            this.title = item.title
            this.description = item.description
            this.thumbnail = !null
            this.thumbnailUrl = item.thumbnailUrl
            this.headline = item.headline
            this.content = item.content
            this.summary = item.summary
            this.created = item.created
          }
        })
      }
    },
    formIsValid () {
      return this.hasText(this.description) &&
        this.hasText(this.headline) &&
        this.hasText(this.summary) &&
        this.isNotNull(this.thumbnail)
    }
  },
  data () {
    return {
      id: '',
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
      content: [],
      contentTip: '<p>The content you want placed in the case.</p>',
      created: ''
    }
  },
  methods: {
    addContentField (type) {
      document.createElement('li')
      this.content.push({
        file: {
          name: `Select ${type}`
        }
      })
    },
    removeElement (i) {
      this.content.splice(i, 1)
      console.log('Content after removal: ', this.content)
    },
    handleContentFile (e, row, i) {
      const file = e.target.files[0]
      row.file = file

      this.handleFile(e, 'contentImage', i)
    },

    publishCase () {
      if (this.formType === 'edit') {
        const caseData = {
          id: this.id,
          title: this.title,
          description: this.description,
          headline: this.headline,
          summary: this.summary,
          content: this.content
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
          content: this.content,
          created: new Date()
          // Published flag?
        }

        this.$store.dispatch('addCase', caseData)
        this.$router.push('/cases')
      }
    },
    deleteCase () {
      this.$store.dispatch('deleteCase', this.id)
      this.$router.push('/cases')
    },
    requestDeletion () {
      // Alert modal method
      this.deleteCase()
    },
    saveCase () {
      console.log('Saving case...')
    },
    submitForm (e) {
      if (e.target.dataset.action === 'delete') {
        this.requestDeletion()
      }

      if (e.target.dataset.action === 'save') {
        this.saveCase()
      }

      if (!this.formIsValid) {
        return
      }

      if (e.target.dataset.action === 'publish') {
        this.publishCase()
      }
    }
  },
  mixins: [handleFile, transformLabel],
  mounted () {
    if (this.formType === 'edit') {
      const labels = [].slice.call(this.$el.querySelectorAll('.c-form__labelName'))
      labels.map(label => label.classList.add('u-isUntransformed'))
    }
  },
  props: ['formType'],
  watch: {
    currentCase () {
      console.log('Update fields (page load)')
    }
  }
}
</script>