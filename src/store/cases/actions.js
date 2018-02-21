import * as firebase from 'firebase'
import { putStorageFile } from '@/components/utils/putStorageFile'

export default {
  loadCases ({commit}) {
    commit('setLoading', true)
    firebase.database().ref('cases').on('value', (snapshot) => {
      const cases = []
      const obj = snapshot.val()

      for (let key in obj) {
        cases.push({
          id: key,
          caseId: obj[key].caseId,
          title: obj[key].title,
          description: obj[key].description,
          thumbnailUrl: obj[key].thumbnailUrl,
          headline: obj[key].headline,
          summary: obj[key].summary,
          content: obj[key].content,
          created: obj[key].created,
          creatorId: obj[key].creatorId
        })
      }

      commit('setLoadedCases', cases)
      commit('setLoading', false)
    })
  },
  addCase ({commit, getters}, payload) {
    const cases = {
      caseId: `${payload.title.toLowerCase()}-${Math.random().toString(36).substring(7)}`,
      title: payload.title,
      description: payload.description,
      headline: payload.headline,
      summary: payload.summary,
      created: payload.created.toISOString(),
      creatorId: getters.user.id
    }
    let content = []
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
        const contentArr = payload.content
        const uploadStatus = []

        // TODO: Try to unnest this promise inside promise.
        // Might be able to chain the promises. So return the content array and use updatedContentArray in a new then() outside this then().
        Promise.all(contentArr.map(
          item => putStorageFile(item, key, uploadStatus))
        )
          .then((updatedContentArr) => {
            if (updatedContentArr.length === 0) {
              updatedContentArr = [null]
            }
            return firebase.database().ref('cases').child(key).update({content: updatedContentArr})
          })
          .then(() => {
            commit('addCase', {
              ...cases,
              content: content,
              thumbnailUrl: thumbnailUrl,
              id: key
            })
          })
          .catch((error) => {
            console.log(`Some failed: `, error.message)
          })
      })
  },
  deleteCase ({commit}, payload) {
    return firebase.database().ref('cases').child(payload).remove()
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
    if (payload.content) {
      // What do I do with uploadStatus? Maybe console.log it afterwards.
      const uploadStatus = []

      Promise.all(payload.content.map(
        item => putStorageFile(item, payload.id, uploadStatus))
      )
        .then((updatedContentArr) => {
          return firebase.database().ref('cases').child(payload.id).update({content: updatedContentArr})
        })
        .catch((error) => {
          console.log(`Some failed: `, error.message)
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
