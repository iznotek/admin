import * as firebase from 'firebase'
import { putStorageFile } from '@/components/utils/putStorageFile'

export default {
  loadPosts ({commit}) {
    commit('setLoading', true)
    firebase.database().ref('posts').on('value', (snapshot) => {
      const posts = []
      const obj = snapshot.val()

      for (let key in obj) {
        posts.push({
          id: key,
          postId: obj[key].postId,
          title: obj[key].title,
          source: obj[key].source,
          thumbnailUrl: obj[key].thumbnailUrl,
          content: obj[key].content,
          created: obj[key].created,
          creatorId: obj[key].creatorId
        })
      }

      commit('setLoadedPosts', posts)
      commit('setLoading', false)
    })
  },
  addPost ({commit, getters}, payload) {
    const posts = {
      postId: `${payload.title.toLowerCase()}-${Math.random().toString(36).substring(7)}`,
      title: payload.title,
      source: payload.source,
      created: payload.created.toISOString(),
      creatorId: getters.user.id
    }
    let content = []
    let thumbnailUrl
    let key
    firebase.database().ref('posts').push(posts)
      .then((data) => {
        key = data.key
        return key
      })
      .then((key) => {
        const fileName = payload.thumbnail.name
        const fileExtension = fileName.slice(fileName.lastIndexOf('.'))
        return firebase.storage().ref(`posts/${key + fileExtension}`).put(payload.thumbnail)
      })
      .then((fileData) => {
        thumbnailUrl = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('posts').child(key).update({thumbnailUrl: thumbnailUrl})
      })
      .then(() => {
        const contentArr = payload.content
        const uploadStatus = []

        Promise.all(contentArr.map(
          item => putStorageFile(item, key, uploadStatus))
        )
          .then((updatedContentArr) => {
            if (updatedContentArr.length === 0) {
              updatedContentArr = [null]
            }
            return firebase.database().ref('posts').child(key).update({content: updatedContentArr})
          })
          .then(() => {
            commit('addPost', {
              ...posts,
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
  deletePost ({commit}, payload) {
    return firebase.database().ref('posts').child(payload).remove()
  },
  updatePost ({commit}, payload) {
    commit('setLoading', true)
    const updateObj = {}
    if (payload.title) {
      updateObj.title = payload.title
    }
    if (payload.source) {
      updateObj.source = payload.source
    }
    if (payload.thumbnail) {
      const fileName = payload.thumbnail.name
      const fileExtension = fileName.slice(fileName.lastIndexOf('.'))
      return firebase.storage().ref(`posts/${payload.id + fileExtension}`).put(payload.thumbnail)
        .then((fileData) => {
          return firebase.database().ref('posts').child(payload.id).update({thumbnailUrl: fileData.metadata.downloadURLs[0]})
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (payload.content) {
      const uploadStatus = []

      Promise.all(payload.content.map(
        item => putStorageFile(item, payload.id, uploadStatus))
      )
        .then((updatedContentArr) => {
          return firebase.database().ref('posts').child(payload.id).update({content: updatedContentArr})
        })
        .catch((error) => {
          console.log(`Some failed: `, error.message)
        })
    }

    firebase.database().ref('posts').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updatePost', payload)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
  }
}
