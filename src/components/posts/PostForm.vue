<template>
  <form class="c-form c-form--checklist">
    <div class="c-form__fieldsets">
      <fieldset>
        <legend>Details</legend>
        <form-input type="text" name="Title *" copy="titleTip" v-model="title" />
        <form-input type="text" name="Source *" copy="sourceTip" v-model="source" />
        <form-input type="file" name="Thumbnail *" copy="thumbnailTip" @updateThumbnail="setThumbnail"/>
        <content-editor :content="content" @addContentField="addContentField"  @handleContentFile="handleContentFile" @moveContent="moveContent" @removeContent="removeContent"/>
      </fieldset>
    </div>

    <div class="c-form__actions">
      <input class="c-button c-button--secondary" type="submit" value="Delete" data-action="delete"
        v-if="formType === 'edit'" @click.prevent="submitForm">
      <input class="c-button c-button--l c-button--submit" type="submit" value="Publish" data-action="publish" :disabled="!formIsValid" @click.prevent="submitForm">
    </div>

    <modal v-if="modal" event="Delete" @closeModal="closeModal" @submitModal="deletePost">
      <h1>Delete post</h1>
      <p>Remove this post from the database? <em>This action can't be undone.</em></p>
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
    currentPost () {
      return this.$store.getters.loadedPosts.filter((item) => {
        if (item.id === this.$route.params.id) {
          this.id = item.id
          this.title = item.title
          this.source = item.source
          this.thumbnail = !null
          this.content = item.content || []
          this.created = item.created
        }
      })
    },
    formIsValid () {
      return this.hasText(this.title) &&
        this.hasText(this.source) &&
        this.isNotNull(this.thumbnail)
    }
  },
  data () {
    return {
      id: '',
      title: '',
      source: '',
      thumbnail: null,
      content: [],
      created: '',
      modal: false
    }
  },
  methods: {
    closeModal () {
      this.modal = false
    },
    deletePost () {
      this.$store.dispatch('deletePost', this.id)
      this.$router.push('/posts')
    },
    publishPost () {
      if (this.formType === 'edit') {
        const postData = {
          id: this.id,
          title: this.title,
          source: this.source,
          content: this.content
        }

        if (typeof this.thumbnail === 'object') {
          postData.thumbnail = this.thumbnail
        }

        this.$store.dispatch('updatePost', postData)
        this.$router.push('/posts')
      } else {
        const postData = {
          title: this.title,
          source: this.source,
          thumbnail: this.thumbnail,
          content: this.content,
          created: new Date()
          // Published flag?
        }

        this.$store.dispatch('addPost', postData)
        this.$router.push('/posts')
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
        this.publishPost()
      }
    }
  },
  mixins: [checkField, setUpForm],
  watch: {
    currentPost () {
    }
  }
}
</script>