export const handleFile = {
  methods: {
    handleFile (e, type, i) {
      const files = e.target.files
      const fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Choose a valid file')
      }

      const fileReader = new FileReader()

      if (type === 'thumbnail') {
        fileReader.addEventListener('load', () => {
          e.target.closest('.c-form__field').querySelector('label').classList.add('u-isUntransformed')
          this.thumbnailUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])

        this.thumbnail = files[0]
        return this.thumbnail
      }

      if (type === 'contentImage') {
        fileReader.addEventListener('load', () => {
          const contentImageUrl = fileReader.result
          // this.contentUrls.splice(i, 1, contentImageUrl)
          // console.log('From handleFile > contentUrls: ', this.contentUrls)
          e.target.parentNode.querySelector('.c-form__thumbnail').src = contentImageUrl
          // https://github.com/DavidvanOchten/admin/blob/d254168981309b5c090323b72e6c7da40f3fb95b/src/components/mixins/handleFile.js
          // console.log('Check order of putting files in. If putting in no.3 before no.2, no.2 will not be included in the array')
        })
        fileReader.readAsDataURL(files[0])

        const contentImage = files[0]
        this.content.splice(i, 1, contentImage)
      }
    }
  }
}
