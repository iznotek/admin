export default {
  setLoading (state, payload) {
    state.loading = payload
  },
  setUploadStatus (state, payload) {
    state.uploads = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}
