export default {
  setLoadedCases (state, payload) {
    state.loadedCases = payload
  },
  addCase (state, payload) {
    state.loadedCases.push(payload)
  },
  updateCase (state, payload) {
    const caseObj = state.loadedCases.find((targetCase) => {
      return targetCase.id === payload.id
    })

    if (payload.headline) {
      caseObj.headline = payload.headline
    }
    if (payload.source) {
      caseObj.source = payload.source
    }
    if (payload.sourceUrl) {
      caseObj.sourceUrl = payload.sourceUrl
    }
    if (payload.alt) {
      caseObj.alt = payload.alt
    }
  }
}
