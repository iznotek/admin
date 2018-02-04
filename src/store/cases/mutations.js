export default {
  setLoadedCases (state, payload) {
    state.loadedCases = payload
  },
  addCase (state, payload) {
    console.log('mutations: ', payload)
    // state.loadedCases.splice(0, 1, payload)
    state.loadedCases.push(payload)
    // state.loadedCases.pop()
    // state.loadedCases.shift()
  },
  updateCase (state, payload) {
    const caseObj = state.loadedCases.find((targetCase) => {
      return targetCase.id === payload.id
    })

    if (payload.title) {
      caseObj.title = payload.title
    }
    if (payload.description) {
      caseObj.description = payload.description
    }
    if (payload.thumbnail) {
      caseObj.thumbnail = payload.thumbnail
    }
    if (payload.headline) {
      caseObj.headline = payload.headline
    }
    if (payload.summary) {
      caseObj.summary = payload.summary
    }
    if (payload.content) {
      caseObj.content = payload.content
    }
  }
}
