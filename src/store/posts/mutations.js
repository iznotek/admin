export default {
  setLoadedPosts (state, payload) {
    state.loadedPosts = payload
  },
  addPost (state, payload) {
    state.loadedPosts.splice(0, 1, payload)
    state.loadedPosts.reverse()
    console.log('temp solution in posts/mutations: ', state.loadedPosts)
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
