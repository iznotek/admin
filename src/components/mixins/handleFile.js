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
          console.log('thumbnail changed')
          e.target.closest('.c-form__field').querySelector('label').classList.add('u-isUntransformed')
          this.thumbnailUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])

        this.thumbnail = files[0]
      }

      if (type === 'contentImage') {
        fileReader.addEventListener('load', () => {
          const contentImageUrl = fileReader.result
          this.contentUrls.splice(i, 1, contentImageUrl)
          console.log('contentUrls: ', this.contentUrls)
        })
        fileReader.readAsDataURL(files[0])

        const contentImage = files[0]

        // this.content is now Array, maybe change to Object for Firebase
        this.content.splice(i, 1, contentImage)
        console.log('content: ', this.content)
      }
    }
  }
}
