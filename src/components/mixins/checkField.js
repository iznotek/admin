export const checkField = {
  methods: {
    hasText (field) {
      if (field.trim() !== '') {
        return true
      }
    },
    isNotNull (field) {
      if (field !== null) {
        return true
      }
    }
  }
}
