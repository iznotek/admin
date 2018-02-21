export default {
  setLoadedCases (state, payload) {
    state.loadedCases = payload
  },
  addCase (state, payload) {
    state.loadedCases.splice(0, 1, payload)
    state.loadedCases.reverse()
    console.log('temp solution in cases/mutations: ', state.loadedCases)
    // state.loadedCases.push(payload)
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
