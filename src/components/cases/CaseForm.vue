<template>
  <form class="c-form c-form--checklist">
    <div class="c-form__fieldsets">
      <fieldset>
        <legend>SEO</legend>
        <form-input type="text" name="Title" copy="titleTip" v-model="title" />
        <form-input type="textarea" name="Description *" copy="descriptionTip" v-model="description" />
      </fieldset>
      <fieldset>
        <legend>Details</legend>
        <form-input type="file" name="Thumbnail *" copy="thumbnailTip" @updateThumbnail="setThumbnail"/>
        <form-input type="text" name="Headline *" copy="headlineTip" v-model="headline" />
        <form-input type="textarea" name="Summary *" copy="summaryTip" v-model="summary" />
      </fieldset>
      <fieldset>
        <legend>Content</legend>
        <content-editor :content="content" @addContentField="addContentField"  @handleContentFile="handleContentFile" @moveContent="moveContent" @removeContent="removeContent"/>
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
import ContentEditor from '@/components/shared/ContentEditor'
import FormInput from '@/components/shared/FormInput'
import Modal from '@/components/shared/Modal'
import { setUpForm } from '@/components/mixins/setUpForm'
import { checkField } from '@/components/mixins/checkField'

export default {
  components: {
    'contentEditor': ContentEditor,
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
      description: '',
      thumbnail: null,
      headline: '',
      summary: '',
      content: [],
      // contentUrls: [],
      created: '',
      modal: false
    }
  },
  methods: {
    closeModal () {
      this.modal = false
    },
    deleteCase () {
      this.$store.dispatch('deleteCase', this.id)
      this.$router.push('/cases')
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
  mixins: [checkField, setUpForm],
  watch: {
    currentCase () {
    }
  }
}
</script>