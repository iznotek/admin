export default {
  setLoadedPosts (state, payload) {
    state.loadedPosts = payload
  },
  addPost (state, payload) {
    console.log('mutations post: ', payload)
    state.loadedPosts.push(payload)
  },
  updatePost (state, payload) {
    const postObj = state.loadedPosts.find((targetPost) => {
      return targetPost.id === payload.id
    })

    if (payload.title) {
      postObj.title = payload.title
    }
    if (payload.source) {
      postObj.source = payload.source
    }
    if (payload.thumbnail) {
      postObj.thumbnail = payload.thumbnail
    }
    if (payload.content) {
      postObj.content = payload.content
    }
  }
}
