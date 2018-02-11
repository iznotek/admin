import { handleFile } from '@/components/mixins/handleFile'
import { swapArrayItems } from '@/components/mixins/swapArrayItems'

export const setUpForm = {
  methods: {
    addContentField (type) {
      document.createElement('li')
      this.content.push({
        type: type
      })
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
    },
    removeContent (i) {
      this.content.splice(i, 1)
      // this.contentUrls.splice(i, 1)
    },
    setThumbnail (value) {
      this.thumbnail = value
    }
  },
  mixins: [handleFile, swapArrayItems],
  mounted () {
    if (this.formType === 'edit') {
      const labels = [].slice.call(this.$el.querySelectorAll('.c-form__labelName'))
      labels.map(label => label.classList.add('u-isUntransformed'))
    }
  },
  props: ['formType']
}
