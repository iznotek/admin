import * as firebase from 'firebase'

export default {
  loadCases ({commit}) {
    commit('setLoading', true)
    firebase.database().ref('cases').on('value', (snapshot) => {
      const cases = []
      const obj = snapshot.val()

      for (let key in obj) {
        cases.push({
          id: key,
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
      // console.log('Loaded cases: ', cases)
      // console.log('Re-render stuff based on result above')
      console.log('Update view on cases object change')
      // console.log('While adding a new case, it adds an extra case when firebase saved the image. Look into Lazy Image?')
      commit('setLoadedCases', cases)
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
    let contentUrls = []
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
        const content = payload.content
        const arr = []

        const putStorageItem = (imageFile) => {
          return new Promise((resolve, reject) => {
            const storageRef = firebase.storage().ref(`cases/content/${key + imageFile.name}`)
            const task = storageRef.put(imageFile)

            task.on('state_changed', function (snapshot) {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log('Upload is ' + progress + '% done')
            }, function (error) {
              console.log(error)
            }, function () {
              const downloadURL = task.snapshot.downloadURL
              console.log('downloadURL: ', downloadURL)
              arr.push(downloadURL)
              resolve(downloadURL)
            })
          })
        }

        Promise.all(content.map(
          item => putStorageItem(item))
        )
          .then((arr) => {
            console.log('filesArray: ', arr)
            return firebase.database().ref('cases').child(key).update({contentUrls: arr})
          })
          .then(() => {
            commit('addCase', {
              ...cases,
              // contentUrls: contentUrls,
              contentUrls: ['sfddsfd', 'dsfsdf', contentUrls],
              // thumbnailUrl: thumbnailUrl,
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
