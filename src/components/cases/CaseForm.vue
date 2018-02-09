<template>
  <form class="c-form c-form--checklist">
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
      <!-- Content -->
      <fieldset>
        <legend>Content</legend>
        <div class="c-form__field">
          <div class="c-form__actions c-form__actions--content">
            <!-- Pass in content type in the function -->
            <button class="c-button c-button--l" @click.prevent="addContentField">Quote</button>
            <button class="c-button c-button--l" @click.prevent="addContentField">Video</button>
            <button class="c-button c-button--l" @click.prevent="addContentField">Image</button>
          </div>
          <ul>
            <li class="c-form__input c-form__input--file" v-for="(item, i) in content" :key="i">
              <!-- <content-block :item="item" :key="i"/> item.type pass on? -->
              <label class="c-form__label" :for="`contentFile--${i}`">
                <img class="c-form__thumbnail c-form__thumbnail--s" :src="item.src">
                <span>{{item.name || `Select ${item.file.type}`}}</span>
              </label>
              <input type="file" :id="`contentFile--${i}`" @change="handleContentFile($event, item, i)">
              <div style="z-index: 1;">
                 <button class="c-button c-button--secondary c-button--input" @click.prevent="moveContent(i, 'up')">Up</button>
                <button class="c-button c-button--secondary c-button--input" @click.prevent="moveContent(i,'down')">Down</button>
                <button class="c-button c-button--secondary c-button--input" @click.prevent="removeContent(i)">Remove</button>
              </div>
            </li>
          </ul>
        </div>
      </fieldset>
    </div>
    
    <!-- Checklist -->
    <aside class="c-checklist">
      <header class="c-checklist__header">
        <h1>Case</h1>
        <small>Show progress</small>
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
            v-if="formType === 'edit'"
            @click.prevent="submitForm">
        <input class="c-button c-button--l c-button--submit" type="submit" value="Publish" data-action="publish"
          :disabled="!formIsValid"
          @click.prevent="submitForm">
      </div>
    </aside>
    <modal v-if="modal" :title="modalTitle" :copy="modalCopy" event="Delete" @closeModal="closeModal" @submitModal="deleteCase"/>
  </form>
</template>

<script>
import Modal from '@/components/shared/Modal'
import Tooltip from '@/components/shared/Tooltip'
import { handleFile } from '@/components/mixins/handleFile'
import { swapArrayItems } from '@/components/mixins/swapArrayItems'
import { transformLabel } from '@/components/mixins/transformLabel'

export default {
  components: {
    'modal': Modal,
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
            this.content = item.content || []
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
      // contentUrls: [],
      // testArr: [1, 2],
      contentTip: '<p>The content you want placed in the case.</p>',
      created: '',
      modal: false,
      modalTitle: 'Delete case',
      modalCopy: '<p>Remove this case from the database? <em>This action can\'t be undone.</em></p>'
    }
  },
  methods: {
    addContentField (e) {
      document.createElement('li')
      this.content.push({
        file: {
          type: e.target.innerText.toLowerCase()
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
    handleContentFile (e, row, i) {
      const file = e.target.files[0]
      row.file = file

      this.handleFile(e, 'contentImage', i)
    },
    moveContent (i, direction) {
      if (direction === 'up') {
        this.swapItems(this.content, i, i - 1)
        console.log('up: ', this.content)
      } else if (direction === 'down') {
        this.swapItems(this.content, i, i + 1)
        console.log('down: ', this.content)
      }
      return this.content
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
  mixins: [handleFile, swapArrayItems, transformLabel],
  mounted () {
    if (this.formType === 'edit') {
      const labels = [].slice.call(this.$el.querySelectorAll('.c-form__labelName'))
      labels.map(label => label.classList.add('u-isUntransformed'))
    }
  },
  props: ['formType'],
  watch: {
    currentCase () {
      console.log(this.content)
    }
  }
}
</script>