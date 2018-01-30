import * as firebase from 'firebase'

export default {
  loadCases ({commit}) {
    commit('setLoading', true)
    // change to on
    firebase.database().ref('cases').once('value')
      .then((data) => {
        const cases = []
        const obj = data.val()
        for (let key in obj) {
          cases.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            thumbnailUrl: obj[key].thumbnailUrl,
            headline: obj[key].headline,
            summary: obj[key].summary,
            created: obj[key].created,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedCases', cases)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  addCase ({commit, getters}, payload) {
    const cases = {
      title: payload.title,
      description: payload.description,
      headline: payload.headline,
      summary: payload.summary,
      created: payload.created.toISOString(),
      creatorId: getters.user.id
    }
    let thumbnailUrl
    let key
    firebase.database().ref('cases').push(cases)
      .then((data) => {
        key = data.key
        return key
      })
      .then((key) => {
        const fileName = payload.thumbnail.name
        const fileExtension = fileName.slice(fileName.lastIndexOf('.'))
        return firebase.storage().ref(`cases/${key + fileExtension}`).put(payload.thumbnail)
      })
      .then((fileData) => {
        thumbnailUrl = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('cases').child(key).update({thumbnailUrl: thumbnailUrl})
      })
      .then(() => {
        commit('addCase', {
          ...cases,
          thumbnailUrl: thumbnailUrl,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  updateCase ({commit}, payload) {
    commit('setLoading', true)
    const updateObj = {}
    if (payload.title) {
      updateObj.title = payload.title
    }
    if (payload.description) {
      updateObj.description = payload.description
    }
    if (payload.headline) {
      updateObj.headline = payload.headline
    }
    if (payload.summary) {
      updateObj.summary = payload.summary
    }
    if (payload.thumbnail) {
      const fileName = payload.thumbnail.name
      const fileExtension = fileName.slice(fileName.lastIndexOf('.'))
      return firebase.storage().ref(`cases/${payload.id + fileExtension}`).put(payload.thumbnail)
        .then((fileData) => {
          return firebase.database().ref('cases').child(payload.id).update({thumbnailUrl: fileData.metadata.downloadURLs[0]})
        })
        .catch((err) => {
          console.log(err)
        })
    }

    firebase.database().ref('cases').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateCase', payload)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
  }
}
