export const handleFile = {
  methods: {
    handleFile (e) {
      const files = e.target.files
      const fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Choose a valid file')
      }

      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        e.target.closest('.c-form__field').querySelector('label').classList.add('u-isUntransformed')
        // Should match with the data field in the component
        this.thumbnailUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      // Should match with the data field in the component
      this.thumbnail = files[0]
    }
  }
}
