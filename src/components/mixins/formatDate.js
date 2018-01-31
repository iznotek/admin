export const formatDate = {
  methods: {
    formatDate (dateStr) {
      return dateStr.slice(2, 10).replace(/-/g, '/')
    }
  }
}
