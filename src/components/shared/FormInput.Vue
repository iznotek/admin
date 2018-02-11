<template>
  <div class="c-form__field">
    <div class="c-form__label">
      <label class="c-form__labelName" :for="name">{{name}}</label>
      <tool-tip :content="copy" />
    </div>
    <!-- If text -->
    <input v-if="type === 'text'" class="c-form__input" type="text" :id="name" :value="value" 
    @focus="resetLabel" @blur="checkLabel" @input="onInput($event.target.value)">
    <!-- If textarea -->
    <textarea v-if="type === 'textarea'" class="c-form__input" :id="name" :value="value" 
    @focus="resetLabel" @blur="checkLabel" @input="onInput($event.target.value)"></textarea>
    <!-- If file -->
    <div v-if="type === 'file'" :class="`c-form__input c-form__input--file`">
      <input type="file" :id="name" @change="onInputFile($event)">
      <img class="c-form__thumbnail" :src="thumbnailUrl">
    </div>
  </div>
</template>

<script>
import Tooltip from '@/components/shared/Tooltip'
import { handleFile } from '@/components/mixins/handleFile'
import { transformLabel } from '@/components/mixins/transformLabel'

export default {
  computed: {
    currentCase () {
      return this.$store.getters.loadedCases.filter((item) => {
        if (item.id === this.$route.params.id) {
          this.thumbnailUrl = item.thumbnailUrl
        }
      })
    },
    currentPost () {
      return this.$store.getters.loadedPosts.filter((item) => {
        if (item.id === this.$route.params.id) {
          this.thumbnailUrl = item.thumbnailUrl
        }
      })
    }
  },
  data () {
    return {
      thumbnailUrl: ''
    }
  },
  components: {
    'toolTip': Tooltip
  },
  methods: {
    onInput (value) {
      this.$emit('input', value)
    },
    onInputFile (e) {
      const thumbnail = this.handleFile(e, 'thumbnail')
      this.$emit('updateThumbnail', thumbnail)
    }
  },
  mixins: [handleFile, transformLabel],
  props: ['type', 'name', 'copy', 'value'],
  watch: {
    currentCase () {
    },
    currentPost () {
    }
  }
}
</script>