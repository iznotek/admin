<template>
  <form class="c-form c-form--checklist">
    <div class="c-form__fieldsets">
      <fieldset>
        <legend>SEO</legend>
        <form-input type="text" name="Title" :copy="titleTip" v-model="title" />
        <form-input type="textarea" name="Description *" :copy="descriptionTip" v-model="description" />
      </fieldset>
      <fieldset>
        <legend>Details</legend>
        <form-input type="file" name="Thumbnail *" :copy="thumbnailTip" @updateThumbnail="setThumbnail"/>
        <form-input type="text" name="Headline *" :copy="headlineTip" v-model="headline" />
        <form-input type="textarea" name="Summary *" :copy="summaryTip" v-model="summary" />
      </fieldset>
      <fieldset>
        <legend>Content</legend>
        <!-- <content-editor /> -->
        <div class="c-form__field">
          <div class="c-form__actions c-form__actions--content">
            <button class="c-button c-button--l" @click.prevent="addContentField('quote')">Quote</button>
            <button class="c-button c-button--l" @click.prevent="addContentField('video')">Video</button>
            <button class="c-button c-button--l" @click.prevent="addContentField('image')">Image</button>
          </div>
          <ul>
            <li class="c-form__input c-form__input--file" v-for="(item, i) in content" :key="i">
              <label class="c-form__label" :for="`contentFile--${i}`">
                <img class="c-form__thumbnail c-form__thumbnail--s" :src="item.src">
                <span>{{item.name || `Select ${item.file.type}`}}</span>
              </label>
              <input type="file" :id="`contentFile--${i}`" @change="handleContentFile($event, item, i)">
              <div class="c-form__actions c-form__actions--input">
                <button class="c-button c-button--secondary" @click.prevent="moveContent(i, 'up')">Up</button>
                <button class="c-button c-button--secondary" @click.prevent="moveContent(i, 'down')">Down</button>
                <button class="c-button c-button--secondary" @click.prevent="removeContent(i)">Remove</button>
              </div>
            </li>
          </ul>
        </div>
      </fieldset>
    </div>
    
    <aside class="c-checklist">
      <header class="c-checklist__header">
        <h1>Case</h1>
        <small>0%</small>
      </header>
      <ul class="c-checklist__items">
        <li class="c-checklist__item">
          <h2>SEO</h2>
          <span v-if="hasText(this.description)">&#10003;</span>
        </li>
        <li class="c-checklist__item">
          <h2>Details</h2>
          <span v-if="isNotNull(this.thumbnail) && hasText(this.headline) && hasText(this.summary)">&#10003;</span>
        </li>
        <li class="c-checklist__item">
          <h2>Content</h2>
          <span v-if="this.content.length > 0">&#10003;</span>
        </li>
      </ul>
      <div class="c-form__actions">
        <input class="c-button c-button--secondary" type="submit" value="Delete" data-action="delete"
          v-if="formType === 'edit'" @click.prevent="submitForm">
        <input class="c-button c-button--l c-button--submit" type="submit" value="Publish" data-action="publish" :disabled="!formIsValid" @click.prevent="submitForm">
      </div>
    </aside>

    <modal v-if="modal" event="Delete" @closeModal="closeModal" @submitModal="deleteCase">
      <h1>Delete case</h1>
      <p>Remove this case from the database? <em>This action can't be undone.</em></p>
    </modal>
  </form>
</template>

<script>
import Modal from '@/components/shared/Modal'
import FormInput from '@/components/shared/FormInput'
import { handleFile } from '@/components/mixins/handleFile'
import { swapArrayItems } from '@/components/mixins/swapArrayItems'
import { checkField } from '@/components/mixins/checkField'

export default {
  components: {
    'formInput': FormInput,
    'modal': Modal
  },
  computed: {
    currentCase () {
      return this.$store.getters.loadedCases.filter((item) => {
        if (item.id === this.$route.params.id) {
          this.id = item.id
          this.title = item.title
          this.description = item.description
          this.thumbnail = !null
          // this.thumbnailUrl = item.thumbnailUrl
          this.headline = item.headline
          this.content = item.content || []
          this.summary = item.summary
          this.created = item.created
        }
      })
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
      // thumbnailUrl: '',
      thumbnailTip: '<p>The thumbnail shown on the different pages of the website.</p>',
      headline: '',
      headlineTip: '<p>The headline of the case.</p>',
      summary: '',
      summaryTip: '<p>The summary of the case. What was the challenge? What was the solution?</p>',
      content: [],
      // contentUrls: [],
      contentTip: '<p>The content you want placed in the case.</p>',
      created: '',
      modal: false,
      modalTitle: 'Delete case',
      modalCopy: '<p>Remove this case from the database? <em>This action can\'t be undone.</em></p>'
    }
  },
  methods: {
    addContentField (type) {
      document.createElement('li')
      this.content.push({
        file: {
          type: type
        }
      })
    },
    closeModal () {
      this.modal = false
    },
    deleteCase () {
      this.$store.dispatch('deleteCase', this.id)
      this.$router.push('/cases')
    },
    handleContentFile (e, item, i) {
      const file = e.target.files[0]
      item.file = file

      this.handleFile(e, 'contentImage', i)
    },
    moveContent (i, direction) {
      if (direction === 'up') {
        this.swapItems(this.content, i, i - 1)
      } else if (direction === 'down') {
        this.swapItems(this.content, i, i + 1)
      }

      this.$forceUpdate()
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
          // contentUrls: this.contentUrls
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
          // contentUrls: this.contentUrls,
          created: new Date()
          // Published flag?
        }

        this.$store.dispatch('addCase', caseData)
        this.$router.push('/cases')
      }
    },
    removeContent (i) {
      this.content.splice(i, 1)
      // this.contentUrls.splice(i, 1)
    },
    setThumbnail (value) {
      this.thumbnail = value
    },
    submitForm (e) {
      if (e.target.dataset.action === 'delete') {
        this.modal = true
      }

      if (!this.formIsValid) {
        return
      }

      if (e.target.dataset.action === 'publish') {
        this.publishCase()
      }
    }
  },
  mixins: [checkField, handleFile, swapArrayItems],
  mounted () {
    if (this.formType === 'edit') {
      const labels = [].slice.call(this.$el.querySelectorAll('.c-form__labelName'))
      labels.map(label => label.classList.add('u-isUntransformed'))
    }
  },
  props: ['formType'],
  watch: {
    currentCase () {
    }
  }
}
</script>